import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    console.log('Scroll position:', window.scrollY);
    this.isScrolled = window.scrollY > 10;
    console.log('isScrolled:', this.isScrolled);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
