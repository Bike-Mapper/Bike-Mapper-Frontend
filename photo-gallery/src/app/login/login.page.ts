import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { BgServiceService } from '../services/bg-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class LoginPage implements OnInit {
  
  user = {
    name: "João da Silva Sauro",
    id: "432",
    email: "joao@silva.com.br",
    dataNasc:"12/03/2000",
    interests:["walking,cycling,sleeping"]
  };

  constructor(private bgService:BgServiceService, public nav:NavController) {  }

  ngOnInit() { }

  async launchTabsPage() {
    await this.bgService.setUser(this.user);
    this.nav.navigateForward(['tabs']);
    }

    //console.log("click");
    //https://stackoverflow.com/questions/65607106/pass-the-data-between-pages-in-ionic-5
    //https://ionicacademy.com/pass-data-angular-router-ionic-4/ 
}
