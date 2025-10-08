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
  private storiesSubject = new BehaviorSubject<any[]>([]);
  stories$ = this.storiesSubject.asObservable();

  constructor() {}

  /** Guardar historia en Parse y en memoria */
  async saveStory(story: Story): Promise<Story> {
  const StoryObjectClass = Parse.Object.extend(this.className);
  let storyObject: any; // <-- evitar errores de tipado

  if (story.id) {
    const query = new Parse.Query(StoryObjectClass);
    try {
      storyObject = await query.get(story.id);
    } catch (err) {
      // si no existe en Parse por alguna razón, creamos uno nuevo
      storyObject = new StoryObjectClass();
    }
  } else {
    storyObject = new StoryObjectClass();
  }

  storyObject.set('title', story.title);
  storyObject.set('subtitle', story.subtitle || '');

  const cleanContent = story.content.map(block => {
    const { isExpanded, ...rest } = block;
    return rest;
  });

  storyObject.set('content', cleanContent);

  const saved = await storyObject.save();

  const newStory: Story = {
    id: saved.id,
    title: saved.get('title'),
    subtitle: saved.get('subtitle'),
    content: saved.get('content'),
  };

  const current = this.storiesSubject.getValue();
  const existingIndex = current.findIndex(s => s.id === story.id);

  if (existingIndex !== -1) {
    current[existingIndex] = newStory;
    this.storiesSubject.next([...current]);
  } else {
    this.storiesSubject.next([...current, newStory]);
  }

  return newStory;
}


/** Eliminar historia por ID */
async deleteStory(id: string): Promise<void> {
  const query = new Parse.Query(this.className);
  const obj = await query.get(id);
  await obj.destroy();

  // 🔁 eliminar también de memoria
  const current = this.storiesSubject.getValue();
  const updated = current.filter(s => s.id !== id);
  this.storiesSubject.next(updated);
}




  /** Obtener todas las historias desde Parse y actualizar el Subject */
  async loadStories(): Promise<void> {
  const query = new Parse.Query(this.className);
  const results = await query.find();

  const parsedStories: Story[] = results.map(obj => ({
    id: obj.id, // 👈 añadimos el ID de Parse
    title: obj.get('title'),
    subtitle: obj.get('subtitle'),
    content: obj.get('content'),
  }));

  this.storiesSubject.next(parsedStories);
}

  /** Subir imagen a Back4App */
  async uploadImage(file: File): Promise<string> {
    const parseFile = new Parse.File(file.name, file);
    const savedFile = await parseFile.save();
    const url = savedFile?._url;

    if (!url) {
      throw new Error('No se pudo obtener la URL de la imagen');
    }

    return url;
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
