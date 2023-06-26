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
    name: "Nome Errado",
    id: "432",
    email: "joao@silva.com.br",
    dataNasc:"12/03/2000",
    interests:["walking,cycling,sleeping"]
  };

  constructor(private bgService:BgServiceService, public nav:NavController) { 
    
    bgService.login("abc@xyz.com", "123456").then(
      (response: any) => {
        console.log("Res: ", response);
        console.log("Token: ", response["token"]);
        return bgService.get_profile();
      }
    )
    .then((response: any) => {
      let user_info = response;
      console.log(user_info);
      
      this.user = {
        name: user_info["firstName"] + " " + user_info["lastName"],
        id: "432",
        email: "joao@silva.com.br",
        dataNasc:"12/03/2000",
        interests:["walking,cycling,sleeping"]
      }; })
  .catch(() => {});

  }

  ngOnInit() { }

  async launchTabsPage() {
    await this.bgService.setUser(this.user);
    this.nav.navigateForward(['tabs']);
    }

    //console.log("click");
    //https://stackoverflow.com/questions/65607106/pass-the-data-between-pages-in-ionic-5
    //https://ionicacademy.com/pass-data-angular-router-ionic-4/ 
}
