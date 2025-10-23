import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Card } from '@/components/Card';

export async function generateMetadata({ params }: { params: { locale: 'es' | 'en' } }) {
  if (params.locale !== 'en') return {};
  const t = await getTranslations({ locale: 'en', namespace: 'about' });
  return {
    title: `${t('title')} | Andalucía Group`,
    description: t('intro')
  };
}

export default async function AboutPage({ params }: { params: { locale: 'es' | 'en' } }) {
  if (params.locale !== 'en') {
    notFound();
  }

  const t = await getTranslations({ locale: 'en', namespace: 'about' });
  const philosophy = t('philosophy.points', { returnObjects: true }) as string[];
  const pressQuotes = t('press.quotes', { returnObjects: true }) as { quote: string; source: string }[];

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-ink dark:text-white">{t('title')}</h1>
        <p className="max-w-3xl text-base text-ink/70 dark:text-white/70">{t('intro')}</p>
      </header>

      <section className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <Card>
          <div className="space-y-4">
            <h2 className="font-display text-3xl">{t('story.heading')}</h2>
            <p className="text-base text-ink/70 dark:text-white/70">{t('story.body')}</p>
            <p className="text-base text-ink/70 dark:text-white/70">{t('story.body2')}</p>
          </div>
        </Card>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image src="/images/about-team.jpg" alt="Group team" fill className="object-cover" />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {philosophy.map((point) => (
          <Card key={point}>
            <p className="text-base text-ink/70 dark:text-white/70">{point}</p>
          </Card>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="font-display text-3xl">{t('press.heading')}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {pressQuotes.map((quote) => (
            <blockquote key={quote.source} className="rounded-3xl border border-olive-500/20 bg-white/90 p-6 text-ink shadow-soft dark:border-white/10 dark:bg-neutral-900/80">
              <p className="text-lg font-medium">{quote.quote}</p>
              <cite className="mt-3 block text-sm text-ink/60 dark:text-white/60">{quote.source}</cite>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
