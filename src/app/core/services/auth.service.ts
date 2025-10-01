

// auth.service.ts
import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /** Login de usuario */
  async login(username: string, password: string) {
    try {
      const user = await Parse.User.logIn(username, password);
      console.log
      return user;
    } catch (error: any) {
      console.error('Login failed:', error.message);
      throw error;
    }
  }

  /** Logout de usuario */
  async logout(): Promise<void> {
    await Parse.User.logOut();
  }

  /** Usuario actual */
//   get currentUser(): Parse.User | null {
//     return parse.User.current();
//   }

  /** Estado de sesión */
  get isLoggedIn(): boolean {
    return !!Parse.User.current();
  }

  isSalmaLoggedIn(): boolean {
  const user = Parse.User.current();
  if (!user) return false;
  const username = user?.getUsername();
  const sessionToken = user?.getSessionToken();
  if (username !== 'salmacalista') return false;


  return username === 'salmacalista' && !!sessionToken;
}
/** Cambiar contraseña del usuario actual */
async changePassword(oldPassword: string, newPassword: string): Promise<void> {
  try {
    const currentUser = Parse.User.current();
    if (!currentUser) throw new Error('No hay usuario logueado');

    // Reautenticación para seguridad
    const username: string = "salmacalista";
    await Parse.User.logIn(username, oldPassword);

    currentUser.set('password', newPassword);
    await currentUser.save();

    console.log('Contraseña actualizada con éxito');
  } catch (error: any) {
    console.error('Error al cambiar contraseña:', error.message);
    throw error;
  }
}

}
