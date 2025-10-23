import type { Venue } from './types';

import barAntojo from '@/content/venues/bar-antojo.json';
import perroviejo from '@/content/venues/perro-viejo.json';
import perroviejoMalaga from '@/content/venues/perro-viejo-malaga.json';
import pezTomillo from '@/content/venues/pez-tomillo.json';
import picanton from '@/content/venues/picanton-casa-yaki.json';
import seis from '@/content/venues/seis.json';
import verdeLimon from '@/content/venues/verde-limon.json';

export const venues = [
  perroviejo,
  seis,
  picanton,
  barAntojo,
  pezTomillo,
  perroviejoMalaga,
  verdeLimon
] as Venue[];

export function getVenueBySlug(slug: string) {
  return venues.find((venue) => venue.slug === slug);
}

export function getUniqueCities() {
  return Array.from(new Set(venues.map((venue) => venue.city)));
}

export function getUniqueCuisine() {
  const all = venues.flatMap((venue) => venue.cuisine);
  return Array.from(new Set(all));
}

export function getVenuesByCity(city: string) {
  return venues.filter((venue) => venue.city.toLowerCase() === city.toLowerCase());
}
