import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Language, languages } from '../../core/languages/languages';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // BehaviorSubject para mantener el estado actual del idioma
  private currentLanguageSubject: BehaviorSubject<Language>;
  public currentLanguage$: Observable<Language>;

  constructor() {
    // Inicializar con el idioma por defecto
    const defaultLanguage = languages.find(lang => lang.default) || languages[0];
    this.currentLanguageSubject = new BehaviorSubject<Language>(defaultLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
  }

  // Obtener el idioma actual
  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.getValue();
  }

  // Cambiar el idioma
  setLanguage(languageCode: string): void {
    const newLanguage = languages.find(lang => lang.code === languageCode);
    if (newLanguage) {
      this.currentLanguageSubject.next(newLanguage);
      // Opcional: Guardar preferencia en localStorage
      localStorage.setItem('preferredLanguage', languageCode);
    }
  }

  // Obtener traducción para una clave específica
  getTranslation<T extends keyof Language['data']>(section: T, key: keyof Language['data'][T]): string {
    const currentLang = this.getCurrentLanguage();
    return String(currentLang.data[section]?.[key] || key);
  }

  // Obtener el nombre del idioma según el idioma actual
  getLanguageName(language: Language): string {
    const currentLang = this.getCurrentLanguage();
    switch (currentLang.code) {
      case 'en':
        return language.englishName;
      case 'es':
        return language.spanishName;
      case 'in':
        return language.indonesianName;
      default:
        return language.name;
    }
  }

  // Obtener la lista de idiomas disponibles
  getAvailableLanguages(): Language[] {
    return languages;
  }

  // Inicializar el servicio con la preferencia guardada
  initializeLanguage(): void {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      this.setLanguage(savedLanguage);
    }
  }
}
