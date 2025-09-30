import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { stories, Story } from '../../core/models/story.model';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../shared/services/language.service';
import { animateStories } from './stories.animations';

@Component({
  selector: 'app-stories',
  imports: [RouterLink],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.scss'
})
export class StoriesComponent implements OnInit, OnDestroy, AfterViewInit {

  title_h1: string = "";
  subtitle_h2: string = "";
  back_button: string = "";

  private langSubscription!: Subscription;
    
  constructor(private languageService: LanguageService, private router: Router) {}
    
  ngOnInit(): void {
    this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.title_h1 = lang.data.storiesScreen.title_h1 || '';
      this.subtitle_h2 = lang.data.storiesScreen.subtitle_h2 || '';
      this.back_button = lang.data.storiesScreen.back_button || '';
    });
  }
  
  ngAfterViewInit(): void {
    animateStories();
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  stories: Story[] = stories;

  onStoryClick(story: Story) {
    this.router.navigate(['/story', story.title]);
  }
}
