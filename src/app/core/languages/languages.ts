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
    navbarComponent: {
        home?: string;
        stories?: string;
        contact?: string;
        login_title?: string;
        login_user?: string;
        login_password?: string;
        login_button?: string;
        login_close_button?: string;
        gallery: string;
    }
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
    storiesScreen: {
      title_h1?: string;
      subtitle_h2?: string;
      back_button?: string;
      new_story_button?: string;
    },
    storyDetailScreen: {
      back_button?: string;
    },
    storyEditorScreen: {
      title_h1?: string;
      title_label?: string;
      subtitle_label?: string;
      add_block_label?: string;
      add_block_button?: string;
      block_paragraph_label?: string;
      block_image_label?: string;
      block_quote_label?: string;
      block_subtitle_label?: string;
      block_paragraph_placeholder?: string;
      save_button?: string;
      back_button?: string;
      saving: string;
      success: string;
      error: string;

    }
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
        navbarComponent: {
            home: 'Home',
            stories: 'Stories',
            contact: 'Contact',
            login_title: 'Login',
            login_user: 'User',
            login_password: 'Password',
            login_button: 'Enter',
            login_close_button: 'Close',
            gallery: 'Gallery'
        },
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
        storiesScreen: {
          title_h1: 'My Stories',
          subtitle_h2: 'a journey in chapters',
          back_button: 'Back to Home',
          new_story_button: 'New Story'
        },
        storyDetailScreen: {
          back_button: 'Back to Stories'
        },
        storyEditorScreen: {
          title_h1: 'Story Editor',
          title_label: 'Title',
          subtitle_label: 'Subtitle',
          add_block_label: 'Add Block',
          add_block_button: '+ Add',
          block_paragraph_label: 'Paragraph',
          block_image_label: 'Image',
          block_quote_label: 'Quote',
          block_subtitle_label: 'Subtitle',
          block_paragraph_placeholder: 'Write your paragraph here...',
          save_button: 'Save',
          back_button: 'Back to Stories',
          saving: 'Saving...',
          success: 'Success!',
          error: 'Error :('

        }
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
        navbarComponent: {
            home: 'Inicio',
            stories: 'Historias',
            contact: 'Contacto',
            login_title: 'Iniciar Sesión',
            login_user: 'Usuario',
            login_password: 'Contraseña',
            login_button: 'Ingresar',
            login_close_button: 'Cerrar',
            gallery: 'Galería'
        },
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
        storiesScreen: {
          title_h1: 'Mis Historias',
          subtitle_h2: 'un viaje en capítulos',
          back_button: 'Volver al Inicio',
          new_story_button: 'Nueva Historia'
        },
        storyDetailScreen: {
          back_button: 'Volver a Historias'
        },
        storyEditorScreen: {
          title_h1: 'Editor de Historias',
          title_label: 'Título',
          subtitle_label: 'Subtítulo',
          add_block_label: 'Agregar Bloque',
          add_block_button: '+ Agregar',
          block_paragraph_label: 'Párrafo',
          block_image_label: 'Imagen',
          block_quote_label: 'Cita',
          block_subtitle_label: 'Subtítulo',
          block_paragraph_placeholder: 'Escribe tu parágrafo aqui...',
          save_button: 'Guardar',
          back_button: 'Volver a Historias',
          saving: 'Guardando...',
          success: 'Exitoso!',
          error: 'Error :('
        }
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
        navbarComponent: {
            home: 'Beranda',
            stories: 'Cerita',
            contact: 'Kontak',
            login_title: 'Masuk',
            login_user: 'Pengguna',
            login_password: 'Kata Sandi',
            login_button: 'Masuk',
            login_close_button: 'Tutup',
            gallery: 'Galeri'
        },
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
        storiesScreen: {
          title_h1: 'Cerita Saya',
          subtitle_h2: 'perjalanan dalam bab-bab',
          back_button: 'Kembali ke Beranda',
          new_story_button: 'Cerita Baru'
        },
        storyDetailScreen: {
          back_button: 'Kembali ke Cerita'
        },
        storyEditorScreen: {
          title_h1: 'Editor Cerita',
          title_label: 'Judul',
          subtitle_label: 'Sub Judul',
          add_block_label: 'Tambahkan Blok',
          add_block_button: '+ Tambahkan',
          block_paragraph_label: 'Paragraf',
          block_image_label: 'Gambar',
          block_quote_label: 'Kutipan',
          block_subtitle_label: 'Sub Judul',
          block_paragraph_placeholder: 'Tulis paragrafmu disini...',
          save_button: 'Simpan',
          back_button: 'Kembali ke Cerita',
          saving: 'Sedang menyimpan gambar...',
          success: 'Berhasil!',
          error: 'Error :('
        }

  }
}
]