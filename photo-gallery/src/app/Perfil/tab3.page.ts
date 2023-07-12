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
  user:any;

  constructor(private bgService: BgServiceService) {
    this.checked = false;
    bgService.showUser();
    this.user = bgService.getUser();
  }

  dump(): void
  {
    this.checked = !this.checked;
    this.counter++;
    console.log(this.counter);
  }

}
