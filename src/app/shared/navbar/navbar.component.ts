import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonLanguagesComponent } from '../button-languages/button-languages.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonLanguagesComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;
  clickCount = 0;
  showLoginModal = false;

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
