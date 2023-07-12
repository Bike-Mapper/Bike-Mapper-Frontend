import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

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
  imports: [CommonModule, IonicModule],
  standalone: true,
})
export class Cupom {
  name!: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}