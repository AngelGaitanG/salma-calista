import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Language } from '../../core/languages/languages';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-button-languages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-languages.component.html',
  styleUrl: './button-languages.component.scss'
})
export class ButtonLanguagesComponent implements OnInit, OnDestroy {
  currentLanguage!: Language;
  languages: Language[] = [];
  isExpanded: boolean = false;
  private langSubscription!: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // Obtener la lista de idiomas
    this.languages = this.languageService.getAvailableLanguages();
    
    // Suscribirse a los cambios de idioma
    this.langSubscription = this.languageService.currentLanguage$.subscribe(
      lang => this.currentLanguage = lang
    );
  }

  ngOnDestroy(): void {
    // Limpieza de la suscripción
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  onLanguageClick(code: string): void {
    if (code === this.currentLanguage.code) {
      this.isExpanded = !this.isExpanded;
    } else {
      this.languageService.setLanguage(code);
      this.isExpanded = false;
    }
  }

  getCurrentLanguageName(language: Language): string {
    return this.languageService.getLanguageName(language);
  }

  getLanguagePosition(code: string): string {
    const currentIndex = this.languages.findIndex(lang => lang.code === this.currentLanguage.code);
    const targetIndex = this.languages.findIndex(lang => lang.code === code);
    const diff = targetIndex - currentIndex;
    
    if (!this.isExpanded) {
      return 'translateX(0)';
    }
    
    // Mueve cada botón 120px (el ancho del botón)
    return `translateX(${diff * 120}px)`;
  }





}
