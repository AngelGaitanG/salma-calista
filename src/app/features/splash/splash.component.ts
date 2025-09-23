import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../shared/services/language.service';
import { Subscription } from 'rxjs';
import gsap from 'gsap';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('welcome') welcomeEl!: ElementRef;
  @ViewChild('toMy') toMyEl!: ElementRef;
  @ViewChild('portfolio') portfolioEl!: ElementRef;
  @ViewChild('by') byEl!: ElementRef;
  @ViewChild('salma') salmaEl!: ElementRef;
  @ViewChild('joinButton') joinButtonEl!: ElementRef;
  @ViewChild('sphere1') sphere1El!: ElementRef;
  @ViewChild('sphere2') sphere2El!: ElementRef;
  welcomeText: string = '';
  toMyText: string = '';
  portfolioText: string = '';
  byText: string = '';
  salmaText: string = '';
  joinText: string = '';
  
  private langSubscription!: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      // Actualizar todos los textos cuando cambie el idioma
      this.welcomeText = lang.data.splashScreen.welcome || '';
      this.toMyText = lang.data.splashScreen.to_my || '';
      this.portfolioText = lang.data.splashScreen.portfolio || '';
      this.byText = lang.data.splashScreen.by_salma?.split(' ')[0] || '';
      this.salmaText = lang.data.splashScreen.by_salma?.split(' ')[1] || '';
      this.joinText = lang.data.splashScreen.startButton || '';
    });
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    // Configuración inicial de los textos
    gsap.set([
      this.welcomeEl.nativeElement,
      this.toMyEl.nativeElement,
      this.portfolioEl.nativeElement,
      this.byEl.nativeElement,
      this.salmaEl.nativeElement,
      this.joinButtonEl.nativeElement
    ], { 
      opacity: 0,
      y: 50
    });

    // Configuración inicial de las esferas
    gsap.set(this.sphere1El.nativeElement, {
      scale: 0.8,
      opacity: 0
    });
    gsap.set(this.sphere2El.nativeElement, {
      scale: 0.8,
      opacity: 0
    });

    // Timeline para la secuencia de animación
    const tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power3.out" }});

    tl.to(this.welcomeEl.nativeElement, { 
      opacity: 1, 
      y: 0,
      duration: 1
    })
    .to(this.toMyEl.nativeElement, { 
      opacity: 1, 
      y: 0 
    }, "-=0.6")
    .to(this.portfolioEl.nativeElement, { 
      opacity: 1, 
      y: 0,
      duration: 1
    }, "-=0.6")
    .to([this.byEl.nativeElement, this.salmaEl.nativeElement], { 
      opacity: 1, 
      y: 0,
      stagger: 0.2
    }, "-=0.4")
    .to(this.joinButtonEl.nativeElement, { 
      opacity: 1, 
      y: 0,
      scale: 1.1,
      duration: 0.6
    }, "-=0.2")
    .to(this.joinButtonEl.nativeElement, {
      scale: 1,
      duration: 0.3
    });

    // Animación de las esferas
    gsap.to(this.sphere1El.nativeElement, {
      opacity: 0.8,
      scale: 1,
      duration: 1.5,
      ease: "power2.out"
    });

    gsap.to(this.sphere2El.nativeElement, {
      opacity: 0.8,
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.3
    });

    // Animación continua de las esferas
    gsap.to(this.sphere1El.nativeElement, {
      x: "20px",
      y: "20px",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(this.sphere2El.nativeElement, {
      x: "-20px",
      y: "-20px",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
}
