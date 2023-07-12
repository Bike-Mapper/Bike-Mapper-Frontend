import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Cupom } from './Ofertas/Cupom.component';


@NgModule({
imports: [
BrowserModule,
HttpClientModule,
FormsModule,
IonicModule.forRoot({}),
],
declarations: [ AppComponent, Cupom],
bootstrap: [ AppComponent ]
})
export class AppModule { }