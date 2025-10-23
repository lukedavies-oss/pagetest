'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { locales } from '@/lib/i18n/config';

interface LocaleToggleProps {
  locale: 'es' | 'en';
}

export function LocaleToggle({ locale }: LocaleToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const otherLocale = locale === 'es' ? 'en' : 'es';

  const handleToggle = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (locales.includes(pathSegments[0] as any)) {
      pathSegments.shift();
    }
    const targetSegments = [otherLocale, ...pathSegments];
    const nextPath = `/${targetSegments.join('/')}`;
    const query = searchParams.toString();
    router.push(query ? `${nextPath}?${query}` : nextPath);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink/70 transition hover:border-olive-500 hover:text-olive-600 dark:border-white/20 dark:text-white/70"
      aria-label={locale === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
    >
      {locale === 'es' ? 'ES / EN' : 'EN / ES'}
    </button>
  );
}
