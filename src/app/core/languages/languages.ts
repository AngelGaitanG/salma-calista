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
    homeScreen: {},
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
        homeScreen: {},
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
        homeScreen: {},
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
        homeScreen: {},
        historiesScreen: {}

  }
}
]