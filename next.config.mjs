import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    formats: ['image/avif', 'image/webp']
  },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es'
  }
};

export default withNextIntl(nextConfig);
