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
// Classe que representa a tela de perfil
export class Perfil implements CheckboxChangeEventDetail {
  // variáveis para a quando se marca a caixinha
  value: any;
  checked: boolean;
  // Usuário logado na sessão
  user:any;

  constructor(private bgService: BgServiceService) {
    this.checked = false;
    bgService.showUser();
    this.user = bgService.getUser();
  }

  dump(): void
  {
    this.checked = !this.checked;
  }

}
