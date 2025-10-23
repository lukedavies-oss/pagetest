'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FilterBarProps {
  cities: string[];
  cuisines: string[];
}

export function FilterBar({ cities, cuisines }: FilterBarProps) {
  const t = useTranslations('filter');
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const cityParam = params.get('city') ?? '';
  const cuisineParam = params.get('cuisine') ?? '';

  const handleChange = (key: 'city' | 'cuisine', value: string) => {
    const search = new URLSearchParams(params.toString());
    if (!value) {
      search.delete(key);
    } else {
      search.set(key, value);
    }
    const query = search.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleClear = () => {
    router.replace(pathname);
  };

  const sortedCities = useMemo(() => cities.slice().sort(), [cities]);
  const sortedCuisines = useMemo(() => cuisines.slice().sort(), [cuisines]);

  return (
    <section aria-label={t('title')} className="mb-10 rounded-3xl border border-black/5 bg-white/80 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-neutral-900/80">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex min-w-[200px] flex-1 flex-col">
          <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wide text-ink/70 dark:text-white/70">
            {t('city')}
          </label>
          <select
            id="city"
            name="city"
            value={cityParam}
            onChange={(event) => handleChange('city', event.target.value)}
            className="mt-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm focus:border-olive-500 dark:border-white/20 dark:bg-neutral-900"
          >
            <option value="">{t('allCities')}</option>
            {sortedCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="flex min-w-[200px] flex-1 flex-col">
          <label htmlFor="cuisine" className="text-xs font-semibold uppercase tracking-wide text-ink/70 dark:text-white/70">
            {t('cuisine')}
          </label>
          <select
            id="cuisine"
            name="cuisine"
            value={cuisineParam}
            onChange={(event) => handleChange('cuisine', event.target.value)}
            className="mt-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm focus:border-olive-500 dark:border-white/20 dark:bg-neutral-900"
          >
            <option value="">{t('allCuisines')}</option>
            {sortedCuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center justify-center rounded-2xl border border-olive-500 px-4 py-3 text-sm font-semibold text-olive-600 transition hover:bg-olive-500 hover:text-white"
        >
          {t('clear')}
        </button>
      </div>
    </section>
  );
}
