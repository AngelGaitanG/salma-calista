import { Injectable } from '@angular/core';
import Parse from 'parse';
import { Story } from '../models/story.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private className = 'Story';

  // 👇 BehaviorSubject mantiene historias en memoria y permite que otros se suscriban
  private storiesSubject = new BehaviorSubject<Story[]>([]);
  stories$ = this.storiesSubject.asObservable();

  constructor() {}

  /** Guardar historia en Parse y en memoria */
  async saveStory(story: Story): Promise<Story> {
    const StoryObject = Parse.Object.extend(this.className);
    const storyObject = new StoryObject();

    storyObject.set('title', story.title);
    storyObject.set('subtitle', story.subtitle || '');

    // limpiamos isExpanded antes de guardar
    const cleanContent = story.content.map(block => {
      const { isExpanded, ...rest } = block;
      return rest;
    });
    storyObject.set('content', cleanContent);

    const saved = await storyObject.save();

    // 👇 agregar también en el BehaviorSubject (inmediato en memoria)
    const newStory: Story = {
      title: saved.get('title'),
      subtitle: saved.get('subtitle'),
      content: saved.get('content'),
    };

    const current = this.storiesSubject.getValue();
    this.storiesSubject.next([...current, newStory]);

    return newStory;
  }

  /** Obtener todas las historias desde Parse y actualizar el Subject */
  async loadStories(): Promise<void> {
    const query = new Parse.Query(this.className);
    const results = await query.find();

    const parsedStories: Story[] = results.map(obj => ({
      title: obj.get('title'),
      subtitle: obj.get('subtitle'),
      content: obj.get('content'),
    }));

    this.storiesSubject.next(parsedStories);
  }

  /** Snapshot directo sin suscribirse */
  getStoriesSnapshot(): Story[] {
    return this.storiesSubject.getValue();
  }

  /** Buscar una historia por título */
  getStoryByTitle(title: string): Story | undefined {
    return this.storiesSubject.getValue().find(s => s.title === title);
  }
}
