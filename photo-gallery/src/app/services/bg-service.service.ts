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
    //console.log("entrei em setUser()");
    this.user.token = user.token;
    this.user.name = user.name; 
    this.user.id = user.id;
    this.user.email = user.email;
    this.user.dataNasc = user.dataNasc;
    this.user.interests=user.interests;
  }
  
  //Devolve objeto user
  getUser(){
    //console.log("entrei em getUser()");
    return this.user;
  }

  // make_profile() {

  // }

  async login(email: string, password: string) {
    const login_info = { email: email, password: password };

    return this.http.post(this._url + "/auth", login_info).toPromise().then((response: any) => {
      this._token = response["token"];
      return response;
    });

    // .subscribe({
    //   next: (response: any) => {
    //     token = response["token"];
    //     console.log('POST request successful:', response, token);

    //   },
    //   error: (error: any) => {
    //     console.error('Error sending POST request:', error);
    //     token = "";
    //   }
    // });

    // while(token == "A") {

    // };


    // console.log('TOKEN: ', token);

    // return token;

  }

  async get_profile() {

    return this.http.get(this._url + "/profile/me", {
      headers: new HttpHeaders().set('x-auth-token', this._token),
    }).toPromise();
    
    
    // .subscribe({
    //   next: (response: any) => {
    //     token = response.token;
    //     console.log('POST request successful:', response);
        
    //     return response;

    //   },
    //   error: (error: any) => {
    //     console.error('Error sending POST request:', error);
    //   }
    // });
    // return null;
  }

  async reportImperfectionAPI(coords: Array<number>)
  {
    return this.http.post(this._url + "/imperfection", {lat: coords[0], long: coords[1]}, {
      headers: new HttpHeaders().set('x-auth-token', this.Token),
    }).toPromise();
  }

  async getAllImperfections(): Promise<Array<JSON>>
  {
    return this.http.get(this._url + "/imperfection", {
      headers: new HttpHeaders().set('x-auth-token', this.Token),
    }).toPromise().then((response: any) => {
      return response["imperfection"];
    });
  }

}
