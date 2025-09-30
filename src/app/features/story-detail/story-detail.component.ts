import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { stories, Story } from '../../core/models/story.model';
import { LanguageService } from '../../shared/services/language.service';
import { Subscription } from 'rxjs';
import { storyDetailAnimations } from './story-detail.animations'; // 👈 importamos

@Component({
  selector: 'app-story-detail',
  imports: [RouterLink],
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss'],
})
export class StoryDetailComponent {
  stories: Story[] = stories;
  selectedStory: Story | undefined;

  back_button: string = "";

  private langSubscription!: Subscription;
    
  constructor(
    private languageService: LanguageService, 
    private route: ActivatedRoute
  ) {}
  
  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
        this.back_button = lang.data.storyDetailScreen.back_button|| '';
      });

    const rawTitle = this.route.snapshot.paramMap.get('title');

    if (rawTitle) {
      this.selectedStory = this.stories.find(
        story => story.title === rawTitle
      );
    }
  }

  ngAfterViewInit() {
    storyDetailAnimations.enter(); // 👈 lanzamos animación cuando todo ya está en DOM
  }
}
