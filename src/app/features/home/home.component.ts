import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  socialMedia: {name: string, url: string, icon: string}[] = [
  { name: 'Instagram', url: 'https://instagram.com/tu_usuario', icon: 'fa-brands fa-instagram' },
  { name: 'TikTok', url: 'https://tiktok.com/@tu_usuario', icon: 'fa-brands fa-tiktok' },
  { name: 'Pinterest', url: 'https://pinterest.com/tu_usuario', icon: 'fa-brands fa-pinterest' }
];


  greetings_h1: string = "";
  greetings_p: string = "";
  about_me: string = "";
  notes_title: string = "";
  gallery_tittle: string = "";

    private langSubscription!: Subscription;
  
    constructor(private languageService: LanguageService) {}
  
    ngOnInit(): void {
    this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      // Actualizar todos los textos cuando cambie el idioma
      this.greetings_h1 = lang.data.homeScreen.greetings_h1 || '';
      this.greetings_p = lang.data.homeScreen.greetings_p || '';
      this.about_me = lang.data.homeScreen.about_me || '';
      this.notes_title = lang.data.homeScreen.notes_title || '';
      this.gallery_tittle = lang.data.homeScreen.gallery_tittle || '';
    });
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
    

  notes = [
    "Hola, como estas?", "Quiero un gato", "Soy Superman!"
  ];

  currentIndex = 0; 
getCurrentImage(index: number): string {
  return index % 2 === 0 ? 'note1' : 'note2';
}


}
