import { Component, OnInit } from '@angular/core';
import { IonicModule, InfiniteScrollCustomEvent } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule]
})

export class Carteira implements OnInit {

  items:string[] = [];

  constructor() {}
  ngOnInit(): void {
    for (let i = 1; i < 51; i++) {
      this.items.push(`Item ${i}`);
  }
  }

}
