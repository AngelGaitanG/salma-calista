import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { stories, Story } from '../../core/models/story.model';
import { LanguageService } from '../../shared/services/language.service';
import { Subscription } from 'rxjs';
import { storyDetailAnimations } from './story-detail.animations';
import { StoryService } from '../../core/services/story.service';

@Component({
  selector: 'app-story-detail',
  imports: [RouterLink],
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss'],
})
export class StoryDetailComponent {
  @Input() story?: Story; // 👈 si se pasa desde el editor

  stories: Story[] = stories;
  selectedStory: Story | undefined;

  back_button: string = "";

  private langSubscription!: Subscription;
    
  constructor(
    private languageService: LanguageService, 
    private route: ActivatedRoute,
    private storyService: StoryService
  ) {}
  
  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.back_button = lang.data.storyDetailScreen.back_button || '';
    });

    // 👇 Condición: si no viene input, entonces intenta cargar por parámetro
    if (!this.story) {
    const rawTitle = this.route.snapshot.paramMap.get('title');
    if (rawTitle) {
      this.selectedStory = this.storyService.getStoryByTitle(rawTitle);
    }
  } else {
    this.selectedStory = this.story;
  }
  }

  ngAfterViewInit() {
    storyDetailAnimations.enter();
  }
}
