import { Component, EnvironmentInjector, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  data: any;

  constructor(private route:ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        //this.data=this.router.getCurrentNavigation()?.extras.state?.['user'];
      }
    }
    );
    //https://stackoverflow.com/questions/63488033/sending-state-with-router-gets-undefined
    console.log(history.state);
    console.log("Nome: "+history.state.name);
    console.log("Email: "+ history.state.email);

  }
}
