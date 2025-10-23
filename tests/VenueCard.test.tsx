import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VenueCard } from '@/components/VenueCard';
import { renderWithIntl } from './test-utils';
import esMessages from '@/lib/i18n/messages/es.json';
import type { Venue } from '@/lib/types';

const mockVenue: Venue = {
  slug: 'test-venue',
  name: { es: 'Prueba', en: 'Test' },
  city: 'Sevilla',
  neighborhood: 'Centro',
  shortDescription: { es: 'Descripción corta', en: 'Short description' },
  cuisine: ['Tapas'],
  tags: ['tapas'],
  description: { es: 'Descripción larga', en: 'Long description' },
  hours: { es: 'Horario', en: 'Hours' },
  address: 'Calle Falsa 123',
  phone: '+34 000 000 000',
  reservationUrl: 'https://example.com',
  instagramUrl: 'https://instagram.com',
  images: ['/images/hero-es.jpg'],
  coordinates: { lat: 0, lng: 0 },
  menu: { es: 'Carta', en: 'Menu' },
  servesCuisine: 'Tapas'
};

describe('VenueCard', () => {
  it('renders venue information and CTAs', () => {
    renderWithIntl(<VenueCard venue={mockVenue} locale="es" />, 'es', esMessages as unknown as Record<string, unknown>);

    expect(screen.getByText('Prueba')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: esMessages.buttons.bookTable })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: esMessages.buttons.viewDetails })).toHaveAttribute('href', '/es/restaurantes/test-venue');
  });
});
