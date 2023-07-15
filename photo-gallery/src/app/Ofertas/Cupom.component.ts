import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { NgxQRCodeModule, NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

import { IonicModule, ModalController } from '@ionic/angular';
// @NgModule({
//   imports: [CommonModule, IonicModule],
//   // selector: 'cupom',
//   // templateUrl: 'Cupom.component.html',
//   // standalone: true,
  
// })
@Component({
  selector: 'cupom',
  templateUrl: 'Cupom.component.html',
  imports: [CommonModule, IonicModule, NgxQRCodeModule],
  standalone: true,
})
// Classe que representa a tela de cupom, isto é quando o usuário clica no botão obter cupom da tela "Ofertas" 
export class Cupom {
  // Nome do cupom
  name!: string;
  // váriaveis para a criação do QR-code
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://empresa-1.com.br/';

  constructor(private modalCtrl: ModalController) {}

  // Cancela a operação de obter cupom e volta de tela
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  // Confirma a operação de obter cupom
  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}