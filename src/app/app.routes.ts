import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/splash/splash.component').then(m => m.SplashComponent)
    },
    {
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        path: 'home'
    }
];
