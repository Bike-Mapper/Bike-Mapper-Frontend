import { Component, OnInit } from '@angular/core';
import { IonicModule, InfiniteScrollCustomEvent } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { BgServiceService } from '../services/bg-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule]
})

// Classe que representa a carteira do usuário
export class Carteira implements OnInit {

  items:string[] = [];
  user: any

  private _bgService;

  constructor(private bgService: BgServiceService) {
    this._bgService = bgService; 
    this.user = {};
  }
  ngOnInit(): void {
    this._bgService.get_profile().then((profile) => {
      this.user = profile;
    } );
    for (let i = 1; i < 51; i++) {
      this.items.push(`Item ${i}`);
  }
  }

}
