import { Injectable } from '@angular/core';
import Parse from 'parse';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private readonly className = 'Notes'; // Nombre de la clase en tu servidor Parse

  constructor() {}

  // 🟢 Obtener todas las notas
  async getNotes(): Promise<Note[]> {
    const query = new Parse.Query(this.className);
    query.descending('createdAt');
    const results = await query.find();
    return results.map(obj => ({
      id: obj.id,
      text: obj.get('text'),
      color: obj.get('color') || '#ffffff', // color por defecto blanco
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt
    }));
  }

  // 🟡 Crear o actualizar una nota
  async saveNote(note: Note): Promise<Note> {
    const NoteObject = Parse.Object.extend(this.className);
    let noteObject: any;

    if (note.id) {
      // Si tiene ID, la buscamos para actualizar
      const query = new Parse.Query(this.className);
      noteObject = await query.get(note.id);
    } else {
      // Si no, creamos una nueva
      noteObject = new NoteObject();
    }

    noteObject.set('text', note.text);
    noteObject.set('color', note.color || '#ffffff');

    const saved = await noteObject.save();
    return {
      id: saved.id,
      text: saved.get('text'),
      color: saved.get('color'),
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt
    };
  }

  // 🔴 Eliminar nota
  async deleteNote(noteId: string): Promise<void> {
    const query = new Parse.Query(this.className);
    const noteObject = await query.get(noteId);
    await noteObject.destroy();
  }
}
