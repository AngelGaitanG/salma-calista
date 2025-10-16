import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../shared/services/language.service';
import { homeAnimations } from './home.animations';
import { GalleryService } from '../../core/services/gallery.service';
import { GalleryPhoto } from '../../core/models/gallery.model';
import { RouterLink } from '@angular/router';
import { NotesService } from '../../core/services/note.service';
import { Note } from '../../core/models/note.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ColorSelectComponent } from './color-selector/color-selector.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule, ColorSelectComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  // 🔗 Redes sociales
  socialMedia: {name: string, url: string, icon: string}[] = [
    { name: 'Instagram', url: 'https://instagram.com/tu_usuario', icon: 'fa-brands fa-instagram' },
    { name: 'TikTok', url: 'https://tiktok.com/@tu_usuario', icon: 'fa-brands fa-tiktok' },
    { name: 'Pinterest', url: 'https://pinterest.com/tu_usuario', icon: 'fa-brands fa-pinterest' }
  ];

  // 🗣️ Textos multilenguaje
  greetings_h1: string = "";
  greetings_p: string = "";
  about_me: string = "";
  notes_title: string = "";
  gallery_tittle: string = "";

  private langSubscription!: Subscription;
  images: GalleryPhoto[] = [];
  notes: Note[] = [];

  // ✏️ Nueva nota temporal
  newNoteText: string = '';
  newNoteColor: string = 'purple-note';

  constructor(
    private languageService: LanguageService,
    private el: ElementRef,
    private galleryService: GalleryService,
    private notesService: NotesService,
    public authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    // Idiomas
    this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.greetings_h1 = lang.data.homeScreen.greetings_h1 || '';
      this.greetings_p = lang.data.homeScreen.greetings_p || '';
      this.about_me = lang.data.homeScreen.about_me || '';
      this.notes_title = lang.data.homeScreen.notes_title || '';
      this.gallery_tittle = lang.data.homeScreen.gallery_tittle || '';
    });


    
    // Galería
    this.images = await this.galleryService.getPhotos();

    // 🟡 Notas
    await this.loadNotes();
  }

colorMap: Record<string, string> = {
  'green-note': '#4CAF50',
  'purple-note': '#9C27B0'
};

getHexForKey(key?: string): string {
  if (!key) return '#ffffff';
  return this.colorMap[key] || '#ffffff';
}
  
getCurrentImage(note: Note, index: number): string {
  // Si la nota tiene un color asignado (purple-note / green-note), usamos eso
  if (note.color) return note.color;

  // Si viene sin color (compatibilidad con notas antiguas)
  return index % 2 === 0 ? 'purple-note' : 'green-note';
}


  /** 📥 Cargar notas desde el servidor */
  async loadNotes(): Promise<void> {
    this.notes = await this.notesService.getNotes();
  }

  /** ➕ Crear una nueva nota */
  async addNote(): Promise<void> {
  if (!this.newNoteText.trim()) return;

  const newNote: Note = {
    text: this.newNoteText,
    color: this.newNoteColor // ahora guardamos la key (ej: 'purple-note')
  };

  const saved = await this.notesService.saveNote(newNote);
  this.notes.unshift(saved); // añadir arriba
  this.newNoteText = ''; // limpiar input
}

  /** 🖊️ Editar una nota existente */
  async editNote(note: Note): Promise<void> {
    const updatedText = prompt('Editar nota:', note.text);
    if (updatedText !== null && updatedText.trim()) {
      note.text = updatedText.trim();
      const saved = await this.notesService.saveNote(note);
      const index = this.notes.findIndex(n => n.id === note.id);
      if (index !== -1) this.notes[index] = saved;
    }
  }

  /** 🗑️ Eliminar nota */
  async deleteNote(note: Note): Promise<void> {
    const confirmDelete = confirm('¿Seguro que quieres eliminar esta nota?');
    if (!confirmDelete || !note.id) return;

    await this.notesService.deleteNote(note.id);
    this.notes = this.notes.filter(n => n.id !== note.id);
  }

  ngOnDestroy(): void {
    if (this.langSubscription) this.langSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    homeAnimations.initAnimations(this.el.nativeElement);
  }
}
