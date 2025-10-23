'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { routes } from '@/lib/i18n/config';
import { LocaleToggle } from './LocaleToggle';

interface NavigationProps {
  locale: 'es' | 'en';
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = [
    { label: t('about'), href: routes[locale].about },
    { label: t('restaurants'), href: routes[locale].restaurants },
    { label: t('reservations'), href: routes[locale].reservations },
    { label: t('careers'), href: routes[locale].careers },
    { label: t('contact'), href: routes[locale].contact }
  ];

  const handleToggle = () => setOpen((value) => !value);

  return (
    <header className="sticky top-0 z-50 bg-sand/90 backdrop-blur supports-backdrop-blur:border-b supports-backdrop-blur:border-black/5 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href={routes[locale].home} className="font-display text-2xl font-semibold">
          {locale === 'es' ? 'Grupo Andalucía' : 'Andalucía Group'}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-olive-600 ${pathname === item.href ? 'text-olive-600' : 'text-ink/80 dark:text-white/80'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleToggle locale={locale} />
          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center rounded-full border border-black/10 p-2 text-ink/70 transition-colors hover:border-olive-500 hover:text-olive-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-500 md:hidden"
            onClick={handleToggle}
          >
            <span aria-hidden>☰</span>
          </button>
        </div>
      </div>
      {open ? (
        <div className="px-6 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-neutral-900/80">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2 transition-colors hover:bg-olive-500/10 ${pathname === item.href ? 'text-olive-600' : 'text-ink/80 dark:text-white/80'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
