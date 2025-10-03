import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/splash/splash.component').then(m => m.SplashComponent)
    },
    {
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        path: 'home'
    },
    {
        loadComponent: () => import('./features/stories/stories.component').then(m => m.StoriesComponent),
        path: 'stories'
    },
    {
        path: 'story/:title',
        loadComponent: () => import('./features/story-detail/story-detail.component').then(m => m.StoryDetailComponent)
    },
    {
        path: 'story-editor',
        loadComponent: () => import('./features/story-editor/story-editor.component').then(m => m.StoryEditorComponent)
    },
    {
        path: 'gallery',
        loadComponent: () => import('./features/gallery/gallery.component').then(m => m.GalleryComponent)
    }
];
