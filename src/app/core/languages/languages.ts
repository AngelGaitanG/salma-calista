export interface Language {
  code: string;
  name: string;
  englishName: string;
  spanishName: string;
  indonesianName: string;
  locale: string;
  icon: string;
  dir: 'ltr' | 'rtl';
  active: boolean;
  default: boolean;
  data: LanguagesData;
}

export interface LanguagesData {
    splashScreen: {
        welcome?: string;
        to_my?: string;
        portfolio?: string;
        by_salma?: string;
        startButton: string;
    },
    homeScreen: {
      greetings_h1?: string;
      greetings_p?: string;
      about_me?: string;
      notes_title?: string;
      gallery_tittle?: string;
    },
    historiesScreen: {}
}

export const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    englishName: 'English',
    spanishName: 'Inglés',
    indonesianName: 'Bahasa Inggris',
    locale: 'en-US',
    icon: 'us',
    dir: 'ltr',
    active: true,
    default: true,
    data: {
        splashScreen: {
            welcome: 'Welcome',
            to_my: 'to my',
            portfolio: 'Portfolio',
            by_salma: 'by Salma',
            startButton: 'Join'
        },
        homeScreen: {
          greetings_h1: 'Hi, I am Salma Calista',
          greetings_p: 'A passionate front-end developer based in Indonesia',
          about_me: 'About Me',
          notes_title: 'Some of my notes',
          gallery_tittle: 'Gallery'
        },
        historiesScreen: {}
    }
  },
  {
    code: 'es',
    name: 'Español',
    englishName: 'Spanish',
    spanishName: 'Español',
    indonesianName: 'Bahasa Spanyol',
    locale: 'es-ES',
    icon: 'es',
    dir: 'ltr',
    active: true,
    default: false,
    data: {
        splashScreen: {
            welcome: 'Bienvenido',
            to_my: 'a mi',
            portfolio: 'Portafolio',
            by_salma: 'por Salma',
            startButton: 'Ingresar'
        },
        homeScreen: {
          greetings_h1: 'Hola, soy Salma Calista',
          greetings_p: 'Una desarrolladora front-end apasionada con base en Indonesia',
          about_me: 'Sobre Mí',
          notes_title: 'Algunas de mis notas',
          gallery_tittle: 'Galería'
        },
        historiesScreen: {}
    }
  },
  {
    code: 'in',
    name: 'Bahasa Indonesia',
    englishName: 'Indonesian',
    spanishName: 'Indonesio',
    indonesianName: 'Bahasa Indonesia',
    locale: 'id-ID',
    icon: 'id',
    dir: 'ltr',
    active: true,
    default: false,
    data: {
        splashScreen: {
            welcome: 'Selamat Datang',
            to_my: 'di',
            portfolio: 'Portofolio',
            by_salma: 'oleh Salma',
            startButton: 'Masuk'
        },
        homeScreen: {
          greetings_h1: 'Hai, saya Salma Calista',
          greetings_p: 'Seorang pengembang front-end yang bersemangat yang berbasis di Indonesia',
          about_me: 'Tentang Saya',
          notes_title: 'Beberapa catatan saya',
          gallery_tittle: 'Galeri'
        },
        historiesScreen: {}

  }
}
]