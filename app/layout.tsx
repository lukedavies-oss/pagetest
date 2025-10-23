import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Grupo Andalucía',
  description: 'Grupo de restaurantes contemporáneos en Sevilla y Málaga.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Grupo Andalucía',
    description: 'Restaurantes de cocina de mercado en Sevilla y Málaga.',
    url: 'https://example.com',
    siteName: 'Grupo Andalucía',
    locale: 'es_ES',
    type: 'website'
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="bg-sand text-ink">
        {children}
      </body>
    </html>
  );
}
