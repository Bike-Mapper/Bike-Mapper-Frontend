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
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
// TODO: Resolver importação do modulo de post 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
// Classe que representa a tela de Home
export class Home implements OnInit {
  // Mapa que aparece na tela de home
  public map!: Map;
  // Latitude do usuário
  private _lat!:number;
  // Longitude do usuário
  private _long!:number;
  // Váriavel para fazer chamadas para o backend
  private _bgService: BgServiceService;
  // Lista de imperfeioções que já foram reportadas
  private _imperfections!: Array<Array<number>>;
  user: any;

  constructor(private http: HttpClient, bgService: BgServiceService) {
    this._bgService = bgService; 
    this.user = {};
  }

  // Getter para longitude
  // #COMMENT: acho uma boa a gente mudar o nome do getter e do setter para não confundir o professor

  get long():number
  {
    return this._lat;
  }

  // Setter para longitude
  private set long(value:number)
  {
    this._lat = value;
  }

  // Getter para latitude
  get lat():number
  {
    return this._long
  }

  // Setter para latitude
  private set lat(value:number)
  {
    this._long = value;
  }

  // função chamada ao iniciar o app
  ngOnInit(): void {
    this._bgService.get_profile().then((profile) => {
      console.log(profile);
      this.user = profile;
    } );

    this._imperfections = [];
    useGeographic(); // important
    this.InitializeMap();
    this.getAllImperfection();
    this.getUserLocation();
  }

  // Função para recolher o localização do usuário (o usuário precisa permitir a coleta de dados)
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

  // função para reportar imperfeição. Usualmente chamada pelo botão "Reportar problema na via"
  reportImperfection()
  {
    this._bgService.reportImperfectionAPI([this.long, this.lat]).catch((err: Error) => {console.log("Error when tried to repor: " + err)}).then(
      () => {
        this._bgService.get_profile().then((profile: any) => {
          this.user.score = profile["score"];
        });
      }
    )
      
    // this._bgService.reportImperfectionAPI([this.long, this.lat]).catch((err: Error) => {console.log("Error when tried to repor: " + err)});  
    
    //Just for testing
    this._imperfections.push([this.long, this.lat]);
    this.markOnMap();
  }

  // Coleta todas as imperfeições no backend
  getAllImperfection()
  {
    // this._bgService.getAllImperfections().then((value: Array<any>) => {
    //   console.log("---> ", value);
    //   value.forEach((coords: any) => {
    //     this._imperfections.push([coords[0], coords[1]]);
    //   })
    // })
    // .then(() => {this.markOnMap();});

  }

  // Marca no mapa a imperfeição relatado pelo usuário (Usualmente essa função é chamada quando ao apertar o botão "Reportar problema na via")
  markOnMap() // place a marker on map
  {
    const markers: Array<Feature> = [];
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/v3.20.1/examples/data/icon.png',
      })
    })
    for(const pos of this._imperfections)
    {
      const marker = new Feature({
        geometry: new Point(pos),
      })
      marker.setStyle(iconStyle);
      markers.push(marker);
    }

    const vectorSource = new VectorSource({
      features: markers,
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

  // Cria uma instância do mapa
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
