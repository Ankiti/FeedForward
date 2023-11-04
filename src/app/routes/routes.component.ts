import { Component, OnInit } from '@angular/core';
import axios from 'axios';

declare var google: any;
const proxyServerUrl = 'http://localhost:3000';

// Create a mapping of location IDs to coordinates
const locationIdToCoordinates: { [key: string]: { lat: number; lng: number } } = {
  depot: {
    lat: 43.45584589345156,
    lng: -80.53382842245905,
  },
  order_1: {
    lat: 43.45816331945647,
    lng: -80.56439523426816,
  },
  order_2: {
    lat: 43.46922126483948,
    lng: -80.57566630953112,
  },
  order_3: {
    lat: 43.46093966670899,
    lng:  -80.55175556430659,
  },
};

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  private ROUTIFIC_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ2Nzg3Yjk0Njg5YzAwMThhN2RlZDQiLCJpYXQiOjE2OTkxMTcyMDl9.djyxC9qQQkzg7D3uIXBJQKuHMEo9W79sO-HCQOdRrRk'; // Replace with your Routific API key
  private GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API key

  private jobStatus: string = 'pending'; // Initial status
  finalres: any;

  ngOnInit() {
    this.calculateOptimalRoute();
  }

  async calculateOptimalRoute() {
    try {
      const routificData = {
        
          "visits": {
            "order_1": {
              "location": {
                "name": "Mary Johnston Public School",
                "lat": 49.227107,
                "lng": -123.1163085
              }
            },
            "order_2": {
              "location": {
                "name": "Laurelwood Public School",
                "lat": 49.2474624,
                "lng": -123.1532338
              }
            },
            "order_3": {
              "location": {
                "name": "Centennial Public School",
                "lat": 49.2819229,
                "lng": -123.1211844
              }
            }
          },
          "fleet": {
            "vehicle_1": {
              "start_location": {
                "id": "depot",
                "name": "Empire Public School",
                "lat": 49.2553636,
                "lng": -123.0873365
              }
            }
  
        }
      };

      // Send the request to initiate a long-running task
      const jobResponse = await this.initiateLongRunningTask(routificData);

      // Extract the job_id
      console.log(jobResponse.data.job_id)
      const job_id = jobResponse.data.job_id;

      // Poll Routific to check the job status
      await this.checkJobStatus(job_id);

      // Once the job is finished, fetch the results
      if (this.jobStatus === 'finished') {
        console.log(this.finalres)
       //const results = await this.fetchJobResults(job_id);

        // Process the Routific response and display the route on Google Maps
        this.displayOptimizedRoute();
      } else {
        console.log('Job is not finished yet. Status: ' + this.jobStatus);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async initiateLongRunningTask(data: any) {
    const url = 'https://api.routific.com/v1/vrp-long'; // Use the long-running URL
    return axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${this.ROUTIFIC_API_KEY}`
      }
    });
  }

  async checkJobStatus(job_id: string) {
    const url = `https://api.routific.com/jobs/${job_id}`;
    let response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${this.ROUTIFIC_API_KEY}`
      }
    });

    // Poll Routific until the job is finished
    while (response.data.status === 'pending' || response.data.status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
      response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.ROUTIFIC_API_KEY}`
        }
      });
    }
    this.jobStatus = response.data.status;
    this.finalres = response.data.output;
  }

  async fetchJobResults(job_id: string) {
    const url = `https://api.routific.com/jobs/${job_id}/output`;
    return axios.get(url, {
      headers: {
        'Authorization': `Bearer ${this.ROUTIFIC_API_KEY}`
      }
    });
  }

  displayOptimizedRoute() {
    // Initialize the map
    const mapElement = document.getElementById('map');
    const map = new google.maps.Map(mapElement, {
      center: { lat: 43.462869519165395, lng: -80.5351845461612 },
      zoom: 14,
    });
  
    // Extract and display locations from finalres
    this.finalres.solution.vehicle_1.forEach((location: any, index: number) => {
      const locationId = location.location_id;
      if (locationId in locationIdToCoordinates) {
        console.log('loc', location)
        const coordinates = locationIdToCoordinates[locationId];
        const marker = new google.maps.Marker({
          position: {
            lat: coordinates.lat,
            lng: coordinates.lng,
          },
          map: map,
          label: (index + 1).toString(),
          title: location.location_name,
        });
      }
    });
  }
  
  
}