export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export const localeLabels: Record<Locale, string> = {
  es: 'ES',
  en: 'EN'
};

export const routes = {
  es: {
    home: '/es',
    restaurants: '/es/restaurantes',
    reservations: '/es/reservas',
    about: '/es/sobre-el-grupo',
    careers: '/es/trabaja',
    contact: '/es/contacto',
    cookies: '/es/cookies'
  },
  en: {
    home: '/en',
    restaurants: '/en/restaurants',
    reservations: '/en/reservations',
    about: '/en/about',
    careers: '/en/careers',
    contact: '/en/contact',
    cookies: '/en/cookies'
  }
} as const;
