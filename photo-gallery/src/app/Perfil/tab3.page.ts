import { Component } from '@angular/core';
import { CheckboxChangeEventDetail, IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BgServiceService } from '../services/bg-service.service';

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
  user:any;

  constructor(private bgService: BgServiceService) {
    this.checked = false;
    this.counter = 0;
    bgService.showUser();
    this.user = bgService.getUser();
    console.log(this.user.name);
  }

  dump(): void
  {
    this.checked = !this.checked;
  }

}
