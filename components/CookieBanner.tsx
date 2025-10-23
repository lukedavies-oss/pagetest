'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { routes } from '@/lib/i18n/config';

interface CookieBannerProps {
  locale: 'es' | 'en';
}

const STORAGE_KEY = 'grupo-andalucia-cookie-consent';

export function CookieBanner({ locale }: CookieBannerProps) {
  const t = useTranslations('cookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setVisible(stored !== 'accepted');
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'accepted');
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(90%,32rem)] -translate-x-1/2 rounded-3xl border border-black/10 bg-white/95 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-neutral-900/95">
      <p className="text-sm text-ink/80 dark:text-white/80">{t('message')}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-full bg-olive-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-olive-600"
          onClick={handleAccept}
        >
          {t('accept')}
        </button>
        <Link
          href={routes[locale].cookies}
          className="text-sm font-semibold text-olive-600 underline-offset-4 hover:underline"
        >
          {t('learnMore')}
        </Link>
      </div>
    </div>
  );
}
