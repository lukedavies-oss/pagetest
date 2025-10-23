import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { FilterBar } from '@/components/FilterBar';
import { VenueCard } from '@/components/VenueCard';
import { getUniqueCities, getUniqueCuisine, venues } from '@/lib/venues';

interface PageProps {
  params: { locale: 'es' | 'en' };
  searchParams: { city?: string; cuisine?: string };
}

export async function generateMetadata({ params }: { params: { locale: 'es' | 'en' } }) {
  if (params.locale !== 'en') return {};
  const t = await getTranslations({ locale: 'en', namespace: 'restaurants' });
  return {
    title: `${t('title')} | Andalucía Group`,
    description: t('intro')
  };
}

export default async function RestaurantsPage({ params, searchParams }: PageProps) {
  if (params.locale !== 'en') {
    notFound();
  }

  const t = await getTranslations({ locale: 'en', namespace: 'restaurants' });
  const city = searchParams.city;
  const cuisine = searchParams.cuisine;

  const filtered = venues.filter((venue) => {
    const matchCity = city ? venue.city === city : true;
    const matchCuisine = cuisine ? venue.cuisine.includes(cuisine) : true;
    return matchCity && matchCuisine;
  });

  const cities = getUniqueCities();
  const cuisines = getUniqueCuisine();

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-ink dark:text-white">{t('title')}</h1>
        <p className="max-w-2xl text-base text-ink/70 dark:text-white/70">{t('intro')}</p>
      </header>
      <FilterBar cities={cities} cuisines={cuisines} />
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((venue) => (
            <VenueCard key={venue.slug} venue={venue} locale="en" />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-dashed border-olive-500/40 bg-olive-500/5 p-6 text-sm text-ink/70 dark:text-white/70">
          {t('empty')}
        </p>
      )}
    </div>
  );
}
