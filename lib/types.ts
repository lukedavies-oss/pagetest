export interface LocaleContent {
  es: string;
  en: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Venue {
  slug: string;
  name: LocaleContent;
  city: 'Sevilla' | 'Málaga';
  neighborhood: string;
  shortDescription: LocaleContent;
  cuisine: string[];
  tags: string[];
  description: LocaleContent;
  hours: LocaleContent;
  address: string;
  phone: string;
  reservationUrl: string;
  instagramUrl: string;
  images: string[];
  coordinates: Coordinates;
  menu: LocaleContent;
  servesCuisine: string;
}
