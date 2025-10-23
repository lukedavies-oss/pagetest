import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { venues, getVenuesByCity } from '@/lib/venues';

export async function generateMetadata({ params }: { params: { locale: 'es' | 'en' } }) {
  if (params.locale !== 'es') return {};
  const t = await getTranslations({ locale: 'es', namespace: 'reservations' });
  return {
    title: `${t('title')} | Grupo Andalucía`,
    description: t('intro')
  };
}

export default async function ReservationsPage({ params }: { params: { locale: 'es' | 'en' } }) {
  if (params.locale !== 'es') {
    notFound();
  }

  const t = await getTranslations({ locale: 'es', namespace: 'reservations' });
  const buttons = await getTranslations({ locale: 'es', namespace: 'buttons' });
  const cities = Array.from(new Set(venues.map((venue) => venue.city)));

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-ink dark:text-white">{t('title')}</h1>
        <p className="max-w-2xl text-base text-ink/70 dark:text-white/70">{t('intro')}</p>
      </header>
      <div className="space-y-8">
        {cities.map((city) => (
          <section key={city} className="space-y-4">
            <h2 className="text-xl font-semibold text-ink dark:text-white">
              {t('cityLabel')}: {city}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {getVenuesByCity(city).map((venue) => (
                <div key={venue.slug} className="flex flex-col justify-between rounded-3xl border border-black/5 bg-white/90 p-6 shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
                  <div className="space-y-2">
                    <p className="font-display text-2xl text-ink dark:text-white">{venue.name.es}</p>
                    <p className="text-sm text-ink/70 dark:text-white/70">{venue.shortDescription.es}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={venue.reservationUrl}
                      className="rounded-full bg-olive-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-olive-600"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-analytics={`reservations-${venue.slug}`}
                    >
                      {buttons('bookTable')}
                    </a>
                    <Link
                      href={`/es/restaurantes/${venue.slug}`}
                      className="rounded-full border border-olive-500 px-5 py-2 text-sm font-semibold text-olive-600 transition hover:bg-olive-500 hover:text-white"
                    >
                      {buttons('viewDetails')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
