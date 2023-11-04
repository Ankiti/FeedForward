import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
})
export class HomeListComponent implements OnInit {
  childrenData: any; // Define a variable to store the JSON data

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('assets/data.json').subscribe((data) => {
      this.childrenData = data;
    });
  }
}