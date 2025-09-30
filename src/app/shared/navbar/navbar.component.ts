import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonLanguagesComponent } from '../button-languages/button-languages.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonLanguagesComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  clickCount = 0;
  showLoginModal = false;

  home = '';
  stories = '';

  private langSubscription!: Subscription;
      
      constructor(private languageService: LanguageService, private route: ActivatedRoute) {}
    
      ngOnDestroy(): void {
        if (this.langSubscription) {
          this.langSubscription.unsubscribe();
        }
      }
  
    ngOnInit() {
      this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
          // Actualizar todos los textos cuando cambie el idioma
          this.home = lang.data.navbarComponent.home|| '';
          this.stories = lang.data.navbarComponent.stories|| '';
        });
      }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onTitleClick() {
    this.clickCount++;
    if (this.clickCount >= 4) {
      this.showLoginModal = true;
      this.clickCount = 0; // reinicia para futuros usos
    }
  }

  closeModal() {
    this.showLoginModal = false;
  }
}
