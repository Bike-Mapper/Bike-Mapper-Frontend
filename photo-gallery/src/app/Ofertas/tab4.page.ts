import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BgServiceService } from '../services/bg-service.service';
import { Observable } from 'rxjs';
import { Company } from '../Company';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Ofertas implements OnInit{
  companies: Array<Company>;

  constructor(private bgService: BgServiceService) {
    bgService.showUser()
    this.companies = [];
  }
  ngOnInit(): void {
    this.get_companies();
  }
  
  get_companies()
  {
    // get from API all companies
    for(let i = 0; i < 25; i++)
    {
      this.companies.push(new Company("Name" + i, "Description" + i, "price" + i, "imagePath" + i));
    }
  }
  
}


