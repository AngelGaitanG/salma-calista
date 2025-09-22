export interface Language {
  code: string;
  name: string;
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
    locale: 'en-US',
    icon: 'us',
    dir: 'ltr',
    active: true,
    default: true,
    data: {
        splashScreen: {
            welcome: 'Welcome',
            to_my: 'to my',
            portfolio: 'portfolio',
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
    locale: 'es-ES',
    icon: 'es',
    dir: 'ltr',
    active: true,
    default: false,
    data: {
        splashScreen: {
            welcome: 'Bienvenido',
            to_my: 'a mi',
            portfolio: 'portafolio',
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
    locale: 'id-ID',
    icon: 'id',
    dir: 'ltr',
    active: true,
    default: false,
    data: {
        splashScreen: {
            welcome: 'Selamat Datang',
            to_my: 'di',
            portfolio: 'portofolio',
            by_salma: 'oleh Salma',
            startButton: 'Masuk'
        },
        homeScreen: {},
        historiesScreen: {}

  }
}
]