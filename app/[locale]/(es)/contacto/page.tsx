import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Card } from '@/components/Card';
import { ContactForm } from '@/components/ContactForm';
import { Map } from '@/components/Map';

export async function generateMetadata({ params }: { params: { locale: 'es' | 'en' } }) {
  if (params.locale !== 'es') return {};
  const t = await getTranslations({ locale: 'es', namespace: 'contact' });
  return {
    title: `${t('title')} | Grupo Andalucía`,
    description: t('intro')
  };
}

export default async function ContactPage({ params }: { params: { locale: 'es' | 'en' } }) {
  if (params.locale !== 'es') {
    notFound();
  }

  const t = await getTranslations({ locale: 'es', namespace: 'contact' });
  const formLabels = t('form', { returnObjects: true }) as unknown as {
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
  };

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-ink dark:text-white">{t('title')}</h1>
        <p className="max-w-2xl text-base text-ink/70 dark:text-white/70">{t('intro')}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60 dark:text-white/60">
              {t('hq')}
            </h2>
            <p className="text-base text-ink/80 dark:text-white/80">Calle San Fernando 12, 41004 Sevilla</p>
            <p className="text-base text-ink/80 dark:text-white/80">hola@grupoandalucia.es</p>
            <p className="text-base text-ink/80 dark:text-white/80">+34 954 00 11 22</p>
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/60 dark:text-white/60">
              {t('hours')}
            </h3>
            <p className="text-base text-ink/80 dark:text-white/80">Lunes a viernes de 09:00 a 18:00</p>
          </div>
        </Card>
        <Map lat={37.3838} lng={-5.9901} title="Grupo Andalucía" />
      </section>

      <section className="rounded-3xl bg-white/90 p-8 shadow-soft dark:bg-neutral-900/80">
        <ContactForm labels={formLabels} locale="es" />
      </section>
    </div>
  );
}
