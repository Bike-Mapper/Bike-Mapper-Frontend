import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BgServiceService {
  
  private user = {
    name: "",
    id: "",
    email: "",
    dataNasc: "",
   interests:[]
  };

  constructor() {

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
}
