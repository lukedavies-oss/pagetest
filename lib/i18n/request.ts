import { getRequestConfig } from 'next-intl/server';

type Locale = 'es' | 'en';

export default getRequestConfig(async ({ locale }) => {
  const supportedLocales: Locale[] = ['es', 'en'];

  if (!supportedLocales.includes(locale as Locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});
