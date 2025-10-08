import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { stories, Story } from '../../core/models/story.model';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../shared/services/language.service';
import { animateStories } from './stories.animations';
import { AuthService } from '../../core/services/auth.service';
import { StoryService } from '../../core/services/story.service';

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
  new_story_button: string = "";

  private langSubscription!: Subscription;
  private storySubscription!: Subscription;
    
  constructor(private languageService: LanguageService, private router: Router, public authService: AuthService, private storyService: StoryService) {}
    
  ngOnInit(): void {
    this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.title_h1 = lang.data.storiesScreen.title_h1 || '';
      this.subtitle_h2 = lang.data.storiesScreen.subtitle_h2 || '';
      this.back_button = lang.data.storiesScreen.back_button || '';
      this.new_story_button = lang.data.storiesScreen.new_story_button || '';
    });

     this.storyService.loadStories();

  // 👇 escuchar actualizaciones
  this.storySubscription = this.storyService.stories$.subscribe(stories => {
    this.stories = stories;
  });
  }

  onEditStory(story: Story) {
  this.router.navigate(['/story-editor'], {
    queryParams: { title: story.title, id: story.id }
  });
}

async onDeleteStory(story: Story) {
  const confirmed = confirm(`¿Are sure to delete this"${story.title}"?`);
  if (!confirmed || !story.id) return;

  try {
    await this.storyService.deleteStory(story.id);

  } catch (err) {

  }
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
