import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../shared/services/language.service';
import { homeAnimations } from './home.animations';
import { GalleryService } from '../../core/services/gallery.service';
import { GalleryPhoto } from '../../core/models/gallery.model';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

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
  
    constructor(private languageService: LanguageService,  private el: ElementRef, private galleryService: GalleryService) {}

    images: GalleryPhoto[] = []
    

        
        async ngOnInit(): Promise<void> {
          this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
            // Actualizar todos los textos cuando cambie el idioma
            this.greetings_h1 = lang.data.homeScreen.greetings_h1 || '';
            this.greetings_p = lang.data.homeScreen.greetings_p || '';
            this.about_me = lang.data.homeScreen.about_me || '';
            this.notes_title = lang.data.homeScreen.notes_title || '';
            this.gallery_tittle = lang.data.homeScreen.gallery_tittle || '';
          });
          this.images = await this.galleryService.getPhotos();
  }

  

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
    

  notes = [
    "Setiap langkah kecil membawa kita lebih dekat pada impian besar.", "Hidup adalah perjalanan, bukan tujuan. Nikmati setiap momen."
  ];

  currentIndex = 0; 
  getCurrentImage(index: number): string {
    return index % 2 === 0 ? 'note1' : 'note2';
  }

 ngAfterViewInit(): void {
    homeAnimations.initAnimations(this.el.nativeElement);
  }

}
