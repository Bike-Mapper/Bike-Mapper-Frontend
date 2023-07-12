import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonicModule, ModalController, NavController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BgServiceService } from '../services/bg-service.service';
import { Observable } from 'rxjs';
import { Company } from '../Company';
import { CommonModule } from '@angular/common';
import { OverlayEventDetail } from '@ionic/core/components';
import { Overlay } from 'ol';
import { Cupom } from './Cupom.component';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Ofertas implements OnInit{
  companies: Array<Company>;
  @ViewChild (IonModal) modal!: IonModal;

  constructor(private bgService: BgServiceService, private modalCtrl: ModalController) {
    bgService.showUser()
    this.companies = [];
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: Cupom,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
      console.log("Confirmed");
    }
  }

  ngOnInit(): void {
    this.get_companies();
  }
  
  get_companies()
  {
    // get from API all companies
    // this.bgService.getCompanies().then((response: any) => {
    //   response.forEach((value: any, index: number) => {
    //     this.companies.push(new Company(value["name"], value["description"], value["price"], value["imagePath"]));
    //   });
    // })
    
    for(let i = 0; i < 25; i++)
    {
      this.companies.push(new Company("Name" + i, "Description" + i, "price" + i, "imagePath" + i));
    }
  }

  on_will_dismiss(event: Event)
  {
    console.log(this.modal);
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // render QR code
      console.log("Dismis modal");
    }
    else if (ev.detail.role === 'cancel')
    {
      console.log("canceled");
    }
  }

  confirm()
  {
    this.modal.dismiss("confirmed", 'confirm');
  }
  
  async cancel()
  {
    this.modal.dismiss(null, "cancel");
    // const modal = await this.modal.getTop();
    // if(modal !== undefined)
    // {
    //   console.log("blablabl");
    //   modal.dismiss();
    // }
    
  }
  
}


