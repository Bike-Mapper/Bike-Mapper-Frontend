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
// Classe que representa a tela de ofertas
export class Ofertas implements OnInit {
  // Lista de companias parceiras do app que tem possuem cupom
  companies: Array<Company>;
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private bgService: BgServiceService, private modalCtrl: ModalController) {
    bgService.showUser()
    this.companies = [];
  }

  // função que abre a tela de cupom (Usualmente essa função é chamada quando se aperta o botão "Obter cupom")
  async openModal(i: number) {

    let value: string = "";

    await this.bgService.buyCupom(this.companies[i]["id"]).then((response: any) => {


      if (response["accept"]) {
        value = response["url"];
      }
      else {
        value = "Você não tem pontos suficientes"
      }

    });
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

  // Função chamada quando se inicia o app
  ngOnInit(): void {
    this.get_companies();
  }

  // Coleta todas as companias que estão no backend
  get_companies() {
    // get from API all companies
    this.bgService.getCompanies().then((response: any) => {
      response.forEach((value: any, index: number) => {
        console.log("Value: ",value)
        this.companies.push(new Company(value["name"], value["description"], value["price"], value["imagePath"], value["_id"]));
      });
    })

    // for(let i = 0; i < 25; i++)
    // {
    //   this.companies.push(new Company("Name" + i, "Description" + i, "price" + i, "imagePath" + i, "https://exemplo-empresa-"+i+".com.br"));
    // }
  }

  // Evento chamado quando o usuário aperta o botão "obter cupom", ela lida com os eventos quando um cupom é confirmado ou cancelado
  on_will_dismiss(event: Event) {
    console.log(this.modal);
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // render QR code
      console.log("Dismis modal");
    }
    else if (ev.detail.role === 'cancel') {
      console.log("canceled");
    }
  }
  // #COMMENT: Acho uma boa retirarmos as duas funções abaixo para não causar confusão
  confirm() {
    this.modal.dismiss("confirmed", 'confirm');
  }

  async cancel() {
    this.modal.dismiss(null, "cancel");
    // const modal = await this.modal.getTop();
    // if(modal !== undefined)
    // {
    //   console.log("blablabl");
    //   modal.dismiss();
    // }

  }

}


