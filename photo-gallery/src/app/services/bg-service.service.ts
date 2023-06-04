import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs';



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
  
  
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8100/api';
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

    return this.http.post(this.url + "/auth", login_info).toPromise();

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

  async get_profile(token: string) {

    return this.http.get(this.url + "/profile/me", {
      headers: new HttpHeaders().set('x-auth-token', token),
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

}
