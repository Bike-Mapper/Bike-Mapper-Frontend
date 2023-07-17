import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, InfiniteScrollCustomEvent, IonModal, ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { BgServiceService } from '../services/bg-service.service';
import { Cupom } from '../Ofertas/Cupom.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule]
})

// Classe que representa a carteira do usuário
export class Carteira implements OnInit {

  items:any[] = [];
  user: any;

  @ViewChild(IonModal) modal!: IonModal;

  private _bgService;

  constructor(private bgService: BgServiceService, private modalCtrl: ModalController) {
    this._bgService = bgService; 
    this.user = {};
  }
  async ngOnInit() {
  }

  async load() {

    await this._bgService.get_profile().then((profile) => {
      this.user = profile;
    } );
    this.items = [];
    for (let cupom_id of this.user.cupons) {
      this._bgService.getCompany(cupom_id).then(
        cupom => {
          this.items.push(cupom);
        }
      )
  }

  }
  
  ionViewDidEnter() {
    this.load();
  }

  // função que abre a tela de cupom (Usualmente essa função é chamada quando se aperta o botão "Obter cupom")
  async openModal(i: number) {
    let value = this.items[i].url;

    const modal = await this.modalCtrl.create({
      component: Cupom,
      componentProps: {
        value: value
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
      console.log("Confirmed");
    }
  }


}
