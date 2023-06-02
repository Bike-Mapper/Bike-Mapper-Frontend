import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class LoginPage implements OnInit {
  
  constructor(public nav: NavController) {

  }

  ngOnInit() {
  }

  user = {
    name: "João da Silva Sauro",
    id: "432",
    email: "joao@silva.com.br",
    interests:["walking,cycling,sleeping"]
  };

  launchTabsPage() {

    this.nav.navigateForward(['tabs'], {state: this.user});
    }

    //console.log("click");
    //https://stackoverflow.com/questions/65607106/pass-the-data-between-pages-in-ionic-5
    //https://ionicacademy.com/pass-data-angular-router-ionic-4/ 
}
