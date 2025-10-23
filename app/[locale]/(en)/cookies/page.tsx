import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Cookies policy | Andalucía Group'
};

export default function CookiesPage({ params }: { params: { locale: 'es' | 'en' } }) {
  if (params.locale !== 'en') {
    notFound();
  }

  return (
    <article className="space-y-6">
      <h1 className="font-display text-4xl text-ink dark:text-white">Cookies policy</h1>
      <p className="text-base text-ink/70 dark:text-white/70">
        We use first-party and third-party cookies to analyze browsing, personalize content and remember your preferences.
      </p>
      <p className="text-base text-ink/70 dark:text-white/70">
        You can configure your browser to reject or delete cookies. Continuing to browse implies acceptance of this policy.
      </p>
      <p className="text-base text-ink/70 dark:text-white/70">
        For any questions contact hello@andaluciagroup.com.
      </p>
    </article>
  );
}
