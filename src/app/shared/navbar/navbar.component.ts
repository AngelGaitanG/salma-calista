import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonLanguagesComponent } from '../button-languages/button-languages.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonLanguagesComponent, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  clickCount = 0;
  showLoginModal = false;
  username = '';
  password = '';

  home = '';
  stories = '';

  login_title = '';
  login_user = '';
  login_password = '';
  login_button = '';
  login_close_button = '';
  gallery = '';

  private langSubscription!: Subscription;
      
      constructor(private languageService: LanguageService, private route: ActivatedRoute, private authService: AuthService) {}
    
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
          this.login_title = lang.data.navbarComponent.login_title|| '';
          this.login_user = lang.data.navbarComponent.login_user|| '';
          this.login_password = lang.data.navbarComponent.login_password|| '';
          this.login_button = lang.data.navbarComponent.login_button|| '';
          this.login_close_button = lang.data.navbarComponent.login_close_button|| '';
          this.gallery = lang.data.navbarComponent.gallery|| '';
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

  
  async onLoginSubmit(event: Event) {
    event.preventDefault();
    try {
      const user = await this.authService.login(this.username, this.password);
      if (user) {
        this.showLoginModal = false;
      }
    } catch (err: any) {
      alert('Login failed: ' + err.message);
    }
  }

  logout() {
    this.authService.logout();
  }
}
