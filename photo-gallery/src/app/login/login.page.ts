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
// Classe que representa a tela de login
export class LoginPage implements OnInit {

  // mock para verificar se a funcionalidade do login está funcionando
  // #COMMENT: acho que remover esse mock é uma boa
  user = {
    name: "Nome Errado",
    id: "432",
    email: "joao@silva.com.br",
    dataNasc: "12/03/2000",
    interests: ["walking,cycling,sleeping"]
  };



  constructor(private bgService: BgServiceService, public nav: NavController) {

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
          dataNasc: "12/03/2000",
          interests: ["walking,cycling,sleeping"]
        };

        localStorage.setItem("user", JSON.stringify(this.user))

      })
      .catch(() => { });
  }

  // Função chamada ao iniciar o app
  ngOnInit() { }

  async launchTabsPage() {
    await this.bgService.setUser(this.user);
    this.nav.navigateForward(['tabs']);
  }

}
