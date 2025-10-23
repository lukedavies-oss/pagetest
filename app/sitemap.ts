import type { MetadataRoute } from 'next';
import { venues } from '@/lib/venues';

const baseUrl = 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/es',
    '/en',
    '/es/restaurantes',
    '/en/restaurants',
    '/es/reservas',
    '/en/reservations',
    '/es/sobre-el-grupo',
    '/en/about',
    '/es/trabaja',
    '/en/careers',
    '/es/contacto',
    '/en/contact',
    '/es/cookies',
    '/en/cookies'
  ];

  const venueRoutes = venues.flatMap((venue) => [
    `/es/restaurantes/${venue.slug}`,
    `/en/restaurants/${venue.slug}`
  ]);

  return [...staticRoutes, ...venueRoutes].map((path) => ({
    url: `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`,
    lastModified: new Date()
  }));
}
