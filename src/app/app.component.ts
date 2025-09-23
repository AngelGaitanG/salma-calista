import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonLanguagesComponent } from './shared/button-languages/button-languages.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonLanguagesComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public router: Router) {}
}
