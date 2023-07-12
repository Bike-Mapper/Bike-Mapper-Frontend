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
export class Cupom {
  name!: string;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://www.techiediaries.com/';

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}