import { Injectable } from '@angular/core';
import Parse from 'parse';
import { GalleryPhoto } from '../models/gallery.model';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {

  private readonly CLASS_NAME = 'GalleryPhoto';

  constructor() {}

  /** Subir imagen y guardar en Parse */
  async addPhoto(photo: Omit<GalleryPhoto, 'src' | 'objectId'>, file: File): Promise<GalleryPhoto> {
  try {
    // Limpieza del nombre del archivo (solo letras, números, guiones y puntos)
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');

    const parseFile = new Parse.File(safeName, file);
    const savedFile = await parseFile.save();

    const GalleryPhotoObj = new Parse.Object(this.CLASS_NAME);
    GalleryPhotoObj.set('description', photo.description);
    GalleryPhotoObj.set('alt', photo.description);
    GalleryPhotoObj.set('src', savedFile?.url());

    const saved = await GalleryPhotoObj.save();

    return {
      objectId: saved.id,
      description: saved.get('description'),
      alt: saved.get('alt'),
      src: saved.get('src'),
    };
  } catch (error) {
    console.error('Error al añadir foto a la galería:', error);
    throw error;
  }
}


  /** Obtener todas las fotos */
  async getPhotos(): Promise<GalleryPhoto[]> {
    try {
      const query = new Parse.Query(this.CLASS_NAME);
      query.descending('createdAt');
      const results = await query.find();

      return results.map((obj) => ({
        objectId: obj.id,
        description: obj.get('description'),
        alt: obj.get('alt'),
        src: obj.get('src'),
      }));
    } catch (error) {
      console.error('Error al obtener fotos de la galería:', error);
      throw error;
    }
  }

  /** Eliminar foto por id */
  async deletePhoto(objectId: string): Promise<void> {
    try {
      const query = new Parse.Query(this.CLASS_NAME);
      const photo = await query.get(objectId);
      if (photo) {
        await photo.destroy();
      }
    } catch (error) {
      console.error('Error al eliminar foto:', error);
      throw error;
    }
  }
}
