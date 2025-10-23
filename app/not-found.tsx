import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-display text-5xl text-ink dark:text-white">{t('title')}</h1>
      <p className="text-base text-ink/70 dark:text-white/70">{t('description')}</p>
      <Link href="/es" className="rounded-full bg-olive-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-olive-600">
        {t('backHome')}
      </Link>
    </div>
  );
}
