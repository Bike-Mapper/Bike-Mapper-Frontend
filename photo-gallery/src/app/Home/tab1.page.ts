import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient } from '@angular/common/http';
// import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';

// TODO: Resolver importação do modulo de post 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Home implements OnInit {
  public map!: Map;
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({ 
        center: [0, 0],
        zoom: 1,maxZoom: 18, 
      }),
    });
  }

  sendPostRequest() {
    const url = 'http://localhost:8100'; // Replace with your API endpoint URL
    const data = { key1: 'value1', key2: 'value2' }; // Replace with your request payload

    this.http.post(url, data).subscribe({
      next: (response) => {
        // Handle successful response
        console.log('POST request successful:', response);
      },
      error: (error) => {
        // Handle error
        console.error('Error sending POST request:', error);
      }
    });
  }
}
