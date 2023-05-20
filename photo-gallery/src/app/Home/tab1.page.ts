import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
// import { HttpClient, Headers, RequestOptions } from '@angular/common/http';

// TODO: Resolver importa;áo do modulo de post 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Home {
  constructor() {}

  // sendPostRequest() {
  //   var headers = new Headers();
  //   headers.append("Accept", 'application/json');
  //   headers.append('Content-Type', 'application/json' );
  //   const requestOptions = new RequestOptions({ headers: headers });

  //   let postData = {
  //           "name": "Customer004",
  //           "email": "customer004@email.com",
  //           "tel": "0000252525"
  //   }

  //   this.http.post("http://127.0.0.1:3000/customers", postData, requestOptions)
  //     .subscribe(data => {
  //       console.log(data['_body']);
  //      }, error => {
  //       console.log(error);
  //     });
  // }
}
