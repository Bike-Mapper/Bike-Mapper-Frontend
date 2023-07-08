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
import { BgServiceService } from '../services/bg-service.service';
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
  private _bgService: BgServiceService;
  private _imperfections!: Array<Array<number>>;
  user: any;

  constructor(private http: HttpClient, bgService: BgServiceService) {
    this._bgService = bgService; 
    this.user = {};
  }
  
  get long():number
  {
    return this._lat;
  }

  private set long(value:number)
  {
    this._lat = value;
  }

  get lat():number
  {
    return this._long
  }

  private set lat(value:number)
  {
    this._long = value;
  }

  ngOnInit(): void {
    this._bgService.get_profile().then((profile) => {
      console.log(profile);
      this.user = profile;
    } );

    this._imperfections = [];
    useGeographic(); // important
    this.getAllImperfection();
    this.getUserLocation();
    this.InitializeMap();
  }

  getUserLocation(){
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.map.getView().setCenter([this.long, this.lat])
        this.map.getView().setZoom(15);
        // we can send this info to the backend
      })
    }
  }

  reportImperfection()
  {
    this._bgService.reportImperfectionAPI([this.long, this.lat]).catch((err: Error) => {console.log("Error when tried to repor: " + err)}).then(
      () => {
        this._bgService.get_profile().then((profile: any) => {
          this.user.score = profile["score"];
        });
      }
    )
      
  }

  getAllImperfection()
  {
    this._bgService.getAllImperfections().then((value: Array<any>) => {
      console.log("---> ", value);
      value.forEach((coords: any) => {
        this._imperfections.push([coords[0], coords[1]]);
      })
    })
    .then(() => {this.markOnMap();})
    ;//.catch((err: Error) => {console.log("Failed to get all imperfection: " + err)})
  }

  markOnMap() // place a marker on map
  {
    const markers: Array<Feature> = [];
    for(const pos of this._imperfections)
    {
      const marker = new Feature({
        geometry: new Point(pos)
      })
      markers.push(marker);
    }

    const vectorSource = new VectorSource({
      features: markers
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

    console.log("===> ", markers);

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

  private InitializeMap(): void
  {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({ 
        center: [0, 0],
        zoom: 2,
      }),
    });
  }


}
