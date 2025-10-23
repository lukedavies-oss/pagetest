import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Card } from '@/components/Card';
import { CareersForm } from '@/components/CareersForm';

export async function generateMetadata({ params }: { params: { locale: 'es' | 'en' } }) {
  if (params.locale !== 'en') return {};
  const t = await getTranslations({ locale: 'en', namespace: 'careers' });
  return {
    title: `${t('title')} | Andalucía Group`,
    description: t('intro')
  };
}

export default async function CareersPage({ params }: { params: { locale: 'es' | 'en' } }) {
  if (params.locale !== 'en') {
    notFound();
  }

  const t = await getTranslations({ locale: 'en', namespace: 'careers' });
  const benefits = t('benefits', { returnObjects: true }) as string[];
  const formLabels = t('form', { returnObjects: true }) as unknown as {
    name: string;
    email: string;
    role: string;
    message: string;
    cv: string;
    submit: string;
    success: string;
  };

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-ink dark:text-white">{t('title')}</h1>
        <p className="max-w-2xl text-base text-ink/70 dark:text-white/70">{t('intro')}</p>
        <p className="max-w-2xl text-base text-ink/70 dark:text-white/70">{t('description')}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {benefits.map((benefit) => (
          <Card key={benefit}>
            <p className="text-base text-ink/70 dark:text-white/70">{benefit}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-3xl bg-white/90 p-8 shadow-soft dark:bg-neutral-900/80">
        <CareersForm labels={formLabels} locale="en" />
      </section>
    </div>
  );
}
