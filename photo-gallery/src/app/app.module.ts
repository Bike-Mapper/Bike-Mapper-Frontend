import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
imports: [
BrowserModule,
HttpClientModule,
],
declarations: [  ],
bootstrap: [ AppComponent  ]
})
export class AppModule { }