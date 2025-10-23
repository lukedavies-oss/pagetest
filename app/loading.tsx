import { getTranslations } from 'next-intl/server';

export default async function Loading() {
  const t = await getTranslations('common');

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <span className="animate-pulse text-sm text-ink/60 dark:text-white/60">{t('loading')}...</span>
    </div>
  );
}
