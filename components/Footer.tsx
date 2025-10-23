import Link from 'next/link';
import { routes } from '@/lib/i18n/config';
import { getTranslations } from 'next-intl/server';

interface FooterProps {
  locale: 'es' | 'en';
}

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/grupoandalucia' },
  { label: 'Facebook', href: 'https://facebook.com/grupoandalucia' }
];

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'footer' });

  const cityList = ['Sevilla', 'Málaga'];
  const quickLinks = [
    { label: t('cookies'), href: routes[locale].cookies },
    { label: locale === 'es' ? 'Reservas' : 'Reservations', href: routes[locale].reservations },
    { label: locale === 'es' ? 'Sobre el Grupo' : 'About', href: routes[locale].about }
  ];

  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:justify-between">
        <div className="space-y-4">
          <p className="font-display text-2xl font-semibold">{locale === 'es' ? 'Grupo Andalucía' : 'Andalucía Group'}</p>
          <p className="max-w-sm text-sm text-white/70">
            {locale === 'es'
              ? 'Cocina de mercado con raíces andaluzas y vocación contemporánea.'
              : 'Market-driven cuisine with Andalusian roots and a contemporary spirit.'}
          </p>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">{t('cities')}</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {cityList.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-olive-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">{t('social')}</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-olive-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/60">
        {t('rights', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
