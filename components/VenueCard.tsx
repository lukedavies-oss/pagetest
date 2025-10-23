'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Venue } from '@/lib/types';
import { useAnalytics } from '@/lib/analytics';

interface VenueCardProps {
  venue: Venue;
  locale: 'es' | 'en';
}

export function VenueCard({ venue, locale }: VenueCardProps) {
  const t = useTranslations('buttons');
  const analyticsReserve = useAnalytics(`reserve-${venue.slug}`);
  const analyticsDetails = useAnalytics(`details-${venue.slug}`);

  return (
    <article className="card-hover overflow-hidden rounded-3xl bg-white shadow-soft dark:bg-neutral-900">
      <div className="relative aspect-[4/3]">
        <Image
          src={venue.images[0]}
          alt={`${venue.name[locale]} hero`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 400px, 100vw"
          priority={false}
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-olive-500/15 px-3 py-1 text-xs font-semibold text-olive-600">
            {venue.city}
          </span>
          <span className="text-xs uppercase tracking-wide text-ink/50 dark:text-white/50">
            {venue.neighborhood}
          </span>
        </div>
        <h3 className="font-display text-2xl text-ink dark:text-white">{venue.name[locale]}</h3>
        <p className="text-sm text-ink/70 dark:text-white/70">{venue.shortDescription[locale]}</p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={venue.reservationUrl}
            {...analyticsReserve}
            className="rounded-full bg-olive-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-olive-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('bookTable')}
          </a>
          <Link
            href={`${locale === 'es' ? '/es/restaurantes' : '/en/restaurants'}/${venue.slug}`}
            {...analyticsDetails}
            className="rounded-full border border-olive-500 px-4 py-2 text-sm font-semibold text-olive-600 transition hover:bg-olive-500 hover:text-white"
          >
            {t('viewDetails')}
          </Link>
        </div>
      </div>
    </article>
  );
}
