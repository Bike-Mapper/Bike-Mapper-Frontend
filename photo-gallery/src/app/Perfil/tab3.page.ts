import { Component } from '@angular/core';
import { CheckboxChangeEventDetail, IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Perfil implements CheckboxChangeEventDetail {
  value: any;
  checked: boolean;
  counter: number;

  constructor() {
    this.checked = false;
    this.counter = 0;
  }

  dump(): void
  {
    this.checked = !this.checked;
    this.counter++;
    console.log(this.counter);
  }

}
