import { Injectable } from '@angular/core';
import Parse from 'parse';

export interface ProfileData {
  id?: string;
  title: string;
  description: string;
  photoUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private className = 'Profile';

  /** Obtener el perfil (solo habrá uno) */
  async getProfile(): Promise<ProfileData | null> {
    const query = new Parse.Query(this.className);
    const result = await query.first();

    if (!result) return null;

    return {
      id: result.id,
      title: result.get('title'),
      description: result.get('description'),
      photoUrl: result.get('photo')?.url(),
    };
  }

  /** Actualizar el perfil */
  async updateProfile(profile: ProfileData, newPhoto?: File): Promise<ProfileData> {
    const Profile = Parse.Object.extend(this.className);
    const query = new Parse.Query(Profile);
    const object = await query.get(profile.id!);

    object.set('title', profile.title);
    object.set('description', profile.description);

    if (newPhoto) {
      const parseFile = new Parse.File(newPhoto.name, newPhoto);
      await parseFile.save();
      object.set('photo', parseFile);
    }

    const saved = await object.save();

    return {
      id: saved.id,
      title: saved.get('title'),
      description: saved.get('description'),
      photoUrl: saved.get('photo')?.url(),
    };
  }
}
