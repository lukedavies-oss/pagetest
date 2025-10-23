import type { ReactNode } from 'react';
import { NextIntlClientProvider, getMessages } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { locales } from '@/lib/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: 'es' | 'en' };
}) {
  unstable_setRequestLocale(params.locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <Navigation locale={params.locale} />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12">{children}</main>
      <Footer locale={params.locale} />
      <CookieBanner locale={params.locale} />
    </NextIntlClientProvider>
  );
}
