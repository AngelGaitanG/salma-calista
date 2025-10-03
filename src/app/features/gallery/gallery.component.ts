import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { GalleryPhoto } from '../../core/models/gallery.model';
import { GalleryService } from '../../core/services/gallery.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../shared/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  imports: [FormsModule, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit, OnDestroy {
  title_h1?: string;
  upload_button?: string;
  delete_button?: string;
  confirm_button?: string;
  loading_text?: string;
  private langSubscription!: Subscription;

  constructor ( public authService: AuthService, private galleryService: GalleryService, private languageService: LanguageService){}

  newPhoto: GalleryPhoto = {
    objectId: '',
    description: '',
    alt: '',
    src: '',
  }
   selectedFile: File | null = null;
  isUploading = false;


  images: GalleryPhoto[] = []

    async ngOnInit() {
      this.langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
            // Actualizar todos los textos cuando cambie el idioma
            this.title_h1 = lang.data.galleryScreen.title_h1 || '';
            this.confirm_button = lang.data.galleryScreen.confirm_button || '';
            this.delete_button = lang.data.galleryScreen.delete_button || '';
            this.upload_button = lang.data.galleryScreen.upload_button || '';
            this.loading_text = lang.data.galleryScreen.loading || '';
          });
    this.images = await this.galleryService.getPhotos();
  }

    ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

   showConfirmModal = false;
  imageToDelete: GalleryPhoto | null = null;
  feedbackMessage: string | null = null;
  uploadModal: boolean = false;
  svgWidth = 505;
  svgHeight = 515;

  // array de índices fijos para los 9 slots
  gridIndices = Array.from({ length: 9 }, (_, i) => i);

  selectedImage: GalleryPhoto | null = null;

    getSrcForSlot(i: number) {
    return this.images[i]?.src || ''; // o un placeholderDataUrl
  }
  openOverlay(image: any) {
    this.selectedImage = image;
  }

  closeOverlay() {
    this.selectedImage = null;
  }

  confirmDelete(image: GalleryPhoto) {
    this.imageToDelete = image;
    this.showConfirmModal = true;
  }

  cancelDelete() {
    this.imageToDelete = null;
    this.showConfirmModal = false;
  }

  async deletePhoto() {
    if (!this.imageToDelete?.objectId) return;

    try {
      await this.galleryService.deletePhoto(this.imageToDelete.objectId);
      this.images = this.images.filter(img => img.objectId !== this.imageToDelete?.objectId);

      this.feedbackMessage = "Imagen eliminada con éxito ✅";
      setTimeout(() => this.feedbackMessage = null, 3000);
    } catch (error) {
      this.feedbackMessage = "Error al eliminar ❌";
      setTimeout(() => this.feedbackMessage = null, 3000);
    }

    this.cancelDelete();
    this.closeOverlay();
  }

  openUploadModal() {
    this.uploadModal = true;
  }
  closeUploadModal() {
    this.uploadModal = false;
    this.selectedFile = null;
    this.newPhoto.description = '';
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  async uploadImage() {
    if (!this.selectedFile || !this.newPhoto.description) return;
    this.isUploading = true;

    try {
      const uploaded = await this.galleryService.addPhoto(
        { description: this.newPhoto.description, alt: this.newPhoto.description },
        this.selectedFile
      );

      // Insertar al inicio sin recargar
      this.images.unshift(uploaded);

      // Reset
      this.closeUploadModal();

    } catch (err) {
      console.error('Error subiendo foto', err);
      alert('Hubo un error al subir la imagen');
    } finally {
      this.isUploading = false;
    }
  }

}
