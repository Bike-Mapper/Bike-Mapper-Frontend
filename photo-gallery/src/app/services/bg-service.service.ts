import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs';
import { resourceUsage } from 'process';



@Injectable({
  providedIn: 'root'
})
export class BgServiceService {
  
  private user = {
    token: "",
    name: "",
    id: "",
    email: "",
    dataNasc: "",
    interests:[]
  };
  
  
  private _url: string;
  private _token!: string;

  constructor(private http: HttpClient) {
    this._url = 'http://localhost:8100/api';

    let stored_user = localStorage.getItem("user");

    if(stored_user) {
      this.user = JSON.parse(stored_user);
      this._token = this.user.token;
    }
  }

  get Url(): string
  {
    return this._url;
  }

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


  async login(email: string, password: string) {
    const login_info = { email: email, password: password };

    return this.http.post(this._url + "/auth", login_info).toPromise().then((response: any) => {
      this._token = response["token"];
      return response;
    });
  }

  async get_profile() {

    return this.http.get(this._url + "/profile/me", {
      headers: new HttpHeaders().set('x-auth-token', this._token),
    }).toPromise();
  }

  async reportImperfectionAPI(coords: Array<number>)
  {
    return this.http.post(this._url + "/imperfection", {lat: coords[0], long: coords[1]}, {
      headers: new HttpHeaders().set('x-auth-token', this.Token),
    }).toPromise();
  }

  async getAllImperfections(): Promise<Array<any>>
  {
    return this.http.get(this._url + "/imperfection").toPromise().then((response: any) => {
      return response;
    });
  }

  async getCompanies(): Promise<Array<any>>
  {
    return this.http.get(this._url + "/company").toPromise().then((response: any) => {
      return response;
    });
  }

  async getScore(): Promise<any>
  {
    return this.http.get(this._url + "/user/score", {
      headers: new HttpHeaders().set('x-auth-token', this._token),
    }).toPromise();
  }

}
