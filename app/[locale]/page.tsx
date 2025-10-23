import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { routes } from '@/lib/i18n/config';
import { venues } from '@/lib/venues';
import { VenueCard } from '@/components/VenueCard';

export const revalidate = 3600;

export default async function HomePage({ params }: { params: { locale: 'es' | 'en' } }) {
  const t = await getTranslations({ locale: params.locale });
  const featured = venues.slice(0, 3);

  const heroImage = params.locale === 'es' ? '/images/hero-es.jpg' : '/images/hero-en.jpg';

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: params.locale === 'es' ? 'Grupo Andalucía' : 'Andalucía Group',
    url: 'https://example.com',
    sameAs: ['https://instagram.com/grupoandalucia'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sevilla',
      addressRegion: 'Andalucía',
      addressCountry: 'ES'
    },
    makesOffer: venues.map((venue) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Restaurant',
        name: venue.name[params.locale]
      }
    }))
  };

  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-3xl bg-ink text-white">
        <Image
          src={heroImage}
          alt={params.locale === 'es' ? 'Restaurante andaluz' : 'Andalusian restaurant'}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 flex flex-col gap-6 px-6 py-24 md:px-12 md:py-32">
          <div className="max-w-xl space-y-4">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-1 text-xs uppercase tracking-wide">
              Andalucía
            </span>
            <h1 className="font-display text-4xl md:text-5xl">{t('hero.title')}</h1>
            <p className="max-w-xl text-lg text-white/80">{t('hero.description')}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href={routes[params.locale].reservations}
              className="rounded-full bg-olive-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-olive-600"
              data-analytics="hero-reserve"
            >
              {t('hero.cta')}
            </Link>
            <Link
              href={routes[params.locale].restaurants}
              className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              {t('home.ctaExplore')}
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-3xl text-ink dark:text-white">{t('home.featuredTitle')}</h2>
          <p className="max-w-2xl text-base text-ink/70 dark:text-white/70">{t('home.featuredSubtitle')}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((venue) => (
            <VenueCard key={venue.slug} venue={venue} locale={params.locale} />
          ))}
        </div>
      </section>

      <section className="grid gap-10 rounded-3xl bg-white/70 p-10 shadow-soft backdrop-blur dark:bg-neutral-900/70 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-display text-3xl">{t('home.storyTitle')}</h3>
          <p className="text-base text-ink/70 dark:text-white/70">{t('home.storyBody')}</p>
        </div>
        <blockquote className="space-y-3 rounded-3xl border border-olive-500/20 bg-olive-500/10 p-6 text-ink dark:text-white">
          <p className="text-lg font-medium">{t('home.pressQuote')}</p>
          <cite className="block text-sm text-ink/60 dark:text-white/60">{t('home.pressSource')}</cite>
        </blockquote>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
    </div>
  );
}
