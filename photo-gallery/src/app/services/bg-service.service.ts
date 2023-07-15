import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs';
import { resourceUsage } from 'process';



@Injectable({
  providedIn: 'root'
})
// Classe que lida com a comunicação entre o backend e o frontend
export class BgServiceService {
  // dicinoário para o usuário
  private user = {
    token: "",
    name: "",
    id: "",
    email: "",
    dataNasc: "",
    interests:[]
  };
  
  // url da página
  private _url: string;
  // token do usuário
  private _token!: string;

  constructor(private http: HttpClient) {
    this._url = 'http://localhost:8100/api';

    let stored_user = localStorage.getItem("user");

    if(stored_user) {
      this.user = JSON.parse(stored_user);
      this._token = this.user.token;
    }
  }

  // getter para Url
  get Url(): string
  {
    return this._url;
  }

  // getter para o token
  get Token(): string
  {
    return this._token;
  }
  
  //Imprime info do user
  showUser() {
    console.log("Id: "+ this.user.id)
    console.log("Name: "+ this.user.name)
    console.log("Email: "+ this.user.email)
    console.log("DataNasc: "+ this.user.dataNasc)
    console.log("Interests: "+ JSON.parse(JSON.stringify(this.user.interests)))
  }
  
  //muda info user
  setUser(user:any){
    this.user.token = user.token;
    this.user.name = user.name; 
    this.user.id = user.id;
    this.user.email = user.email;
    this.user.dataNasc = user.dataNasc;
    this.user.interests=user.interests;
  }
  
  //Devolve objeto user
  getUser(){
    return this.user;
  }

  // Loga o usuário e guarda a sessão no token
  async login(email: string, password: string) {
    const login_info = { email: email, password: password };

    return this.http.post(this._url + "/auth", login_info).toPromise().then((response: any) => {
      this._token = response["token"];
      return response;
    });
  }

  // getter para o profile
  async get_profile() {

    return this.http.get(this._url + "/profile/me", {
      headers: new HttpHeaders().set('x-auth-token', this._token),
    }).toPromise();
  }

  // Registra imperfeição no backend
  async reportImperfectionAPI(coords: Array<number>)
  {
    return this.http.post(this._url + "/imperfection", {lat: coords[0], long: coords[1]}, {
      headers: new HttpHeaders().set('x-auth-token', this.Token),
    }).toPromise();
  }

  // Coleta todas as imperfeições que existem no backend
  async getAllImperfections(): Promise<Array<any>>
  {
    return this.http.get(this._url + "/imperfection").toPromise().then((response: any) => {
      return response;
    });
  }

  // Coleta todas as companhias registradas no backend
  async getCompanies(): Promise<Array<any>>
  {
    return this.http.get(this._url + "/company").toPromise().then((response: any) => {
      return response;
    });
  }

}
