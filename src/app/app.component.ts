import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ButtonLanguagesComponent } from './shared/button-languages/button-languages.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import * as Parse from 'parse';
import { ParseService } from './core/services/parse.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonLanguagesComponent, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeSlideIn', [
      state('in', style({
        transform: 'translateY(0)',
        opacity: 1,
        visibility: 'visible'
      })),
      transition('void => *', [
        style({
          transform: 'translateY(-20px)',
          opacity: 0,
          visibility: 'visible',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          zIndex: '1000'
        }),
        animate('250ms ease-out', style({
          transform: 'translateY(0)',
          opacity: 1
        }))
      ]),
      transition('* => void', [
        animate('150ms ease-in', style({
          transform: 'translateY(-20px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  showNavbar = false;
  showLanguageButton = false;

  constructor(public router: Router, private parseService: ParseService) {
    
  }
  

  ngOnInit() {
    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Pequeño delay para evitar conflictos
        setTimeout(() => {
          this.showNavbar = event.url !== '/';
          this.showLanguageButton = event.url === '/';
        }, 50);
      });

    // Estado inicial
    this.showNavbar = this.router.url !== '/';
    this.showLanguageButton = this.router.url === '/';

  }
}

