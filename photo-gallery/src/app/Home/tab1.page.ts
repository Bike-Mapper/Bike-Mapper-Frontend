import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient } from '@angular/common/http';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { useGeographic } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector';
import XyzSource from 'ol/source/XYZ'
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
  private _lat!:number;
  private _long!:number;

  constructor(private http: HttpClient) {}
  
  get lat():number
  {
    return this._lat;
  }

  private set lat(value:number)
  {
    this._lat = value;
  }

  get long():number
  {
    return this._long
  }

  private set long(value:number)
  {
    this._long = value;
  }

  ngOnInit(): void {
    useGeographic(); // important
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({ 
        center: [0, 0],
        zoom: 1,
      }),
    });
  }

  getUserLocation(){
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.map.getView().setCenter([this.long, this.lat])
        this.map.getView().setZoom(15);
        console.log(this.lat, this.long);
        // we can send this info to the backend
      })
    }
  }

  markOnMap() // place a marker on map
  {
    const pos = [this.long, this.lat];
    const marker = new Feature({
      geometry: new Point(pos)
    })

    const vectorSource = new VectorSource({
      features: [marker]
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource
    })

    const xyzSource = new XyzSource({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    })
    
    const tileLayer = new TileLayer({
      source: xyzSource
    })

    this.map.setLayers([tileLayer, vectorLayer]);
    
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
