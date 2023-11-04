const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the 'cors' package

const app = express();
const port = 3000; // Port for the proxy server

app.use(cors()); // Use the 'cors' middleware to enable CORS

app.use(express.json());

app.use('/maps-api', async (req, res) => {
  try {
    console.log('Received request to /maps-api:', req.query);
    const { key, origins, destinations } = req.query;
    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: { key, origins, destinations },
    });
    console.log('Google Maps API Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).send('Proxy Error');
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
