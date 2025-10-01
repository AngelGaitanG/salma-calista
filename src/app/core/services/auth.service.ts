import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    async login(username: string, password: string): Promise<Parse.User | null> {
    try {
        const user = await Parse.User.logIn(username, password);
        return user as unknown as Parse.User; // 👈 casteo
    } catch (error: any) {
        console.error('Login failed:', error.message);
        throw error;
    }
    }

    get currentUser(): Parse.User | null {
    return Parse.User.current() as unknown as Parse.User; // 👈 casteo
    }


  async logout(): Promise<void> {
    await Parse.User.logOut();
  }



  get isLoggedIn(): boolean {
    return !!Parse.User.current();
  }
}
