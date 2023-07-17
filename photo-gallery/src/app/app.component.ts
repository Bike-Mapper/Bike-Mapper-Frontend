import { Component, EnvironmentInjector, HostListener, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, CommonModule,],
  providers: [HttpClientModule]
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);


  @HostListener('window:load') goToPage() {
    if (!window.location.pathname.includes("/login")) {
      window.location.replace("/login");
    }
  }

  constructor(private router: Router) {}
}
