import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Gallery } from '@/components/Gallery';
import { Map } from '@/components/Map';
import { venues, getVenueBySlug } from '@/lib/venues';

interface PageProps {
  params: { locale: 'es' | 'en'; slug: string };
}

export async function generateStaticParams() {
  return venues.map((venue) => ({ slug: venue.slug, locale: 'en' as const }));
}

export async function generateMetadata({ params }: PageProps) {
  if (params.locale !== 'en') return {};
  const venue = getVenueBySlug(params.slug);
  if (!venue) return {};
  return {
    title: `${venue.name.en} | Andalucía Group`,
    description: venue.shortDescription.en,
    alternates: {
      canonical: `/en/restaurants/${venue.slug}`
    }
  };
}

export default async function VenueDetailPage({ params }: PageProps) {
  if (params.locale !== 'en') {
    notFound();
  }

  const venue = getVenueBySlug(params.slug);
  if (!venue) {
    notFound();
  }

  const t = await getTranslations({ locale: 'en' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: venue.name.en,
    description: venue.description.en,
    image: venue.images,
    telephone: venue.phone,
    address: venue.address,
    servesCuisine: venue.servesCuisine,
    sameAs: venue.instagramUrl,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      description: venue.hours.en
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: venue.coordinates.lat,
      longitude: venue.coordinates.lng
    }
  };

  return (
    <article className="space-y-10">
      <section className="rounded-3xl bg-white p-8 shadow-soft dark:bg-neutral-900">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Link href={`/en/restaurants`} className="text-sm text-olive-600 hover:underline">
              ← {t('venue.back')}
            </Link>
            <h1 className="font-display text-4xl text-ink dark:text-white">{venue.name.en}</h1>
            <p className="text-sm uppercase tracking-wide text-ink/60 dark:text-white/60">
              {venue.city} · {venue.neighborhood}
            </p>
            <p className="max-w-2xl text-base text-ink/70 dark:text-white/70">{venue.description.en}</p>
          </div>
          <a
            href={venue.reservationUrl}
            className="h-fit rounded-full bg-olive-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-olive-600"
            target="_blank"
            rel="noopener noreferrer"
            data-analytics={`detail-reserve-${venue.slug}`}
          >
            {t('buttons.bookTable')}
          </a>
        </div>
      </section>

      <Gallery images={venue.images} locale="en" name={venue.name.en} />

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-3xl bg-white p-6 shadow-soft dark:bg-neutral-900">
          <h2 className="font-display text-2xl">{t('venue.hours')}</h2>
          <p className="text-base text-ink/70 dark:text-white/70">{venue.hours.en}</p>
          <h2 className="font-display text-2xl">{t('venue.address')}</h2>
          <p className="text-base text-ink/70 dark:text-white/70">{venue.address}</p>
          <a href={`tel:${venue.phone}`} className="text-base font-semibold text-olive-600 hover:underline">
            {t('venue.phone')}: {venue.phone}
          </a>
          <a href={venue.instagramUrl} className="text-base font-semibold text-olive-600 hover:underline" target="_blank" rel="noopener noreferrer">
            {t('venue.instagram')}
          </a>
        </div>
        <Map lat={venue.coordinates.lat} lng={venue.coordinates.lng} title={venue.name.en} />
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-soft dark:bg-neutral-900">
        <h2 className="mb-4 font-display text-2xl">{t('venue.menu')}</h2>
        <ReactMarkdown className="prose prose-olive max-w-none text-ink/80 dark:prose-invert">
          {venue.menu.en}
        </ReactMarkdown>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
