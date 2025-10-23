# Grupo Andalucía Web

Marketing website for an upscale casual restaurant group based in Andalucía (Sevilla & Málaga). Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and next-intl for bilingual (Spanish/English) content.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the Spanish experience (`/es`). English content lives under `/en`.

### Available scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run start` – run the production build locally
- `npm run lint` – check ESLint rules
- `npm run test` – execute the Vitest unit tests

## Content model

Restaurant data lives in **`/content/venues/*.json`**. Each file follows this shape:

```json
{
  "slug": "perro-viejo",
  "name": { "es": "Perro Viejo", "en": "Perro Viejo" },
  "city": "Sevilla",
  "neighborhood": "Centro",
  "shortDescription": { "es": "…", "en": "…" },
  "cuisine": ["Tapas"],
  "tags": ["tapas"],
  "description": { "es": "…", "en": "…" },
  "hours": { "es": "…", "en": "…" },
  "address": "Street, City",
  "phone": "+34 …",
  "reservationUrl": "https://…",
  "instagramUrl": "https://…",
  "images": ["/images/perro-viejo-1.jpg"],
  "coordinates": { "lat": 37.39, "lng": -5.99 },
  "menu": { "es": "Markdown", "en": "Markdown" },
  "servesCuisine": "Andalusian contemporary"
}
```

To add a venue:

1. Duplicate an existing JSON file, adjust the fields, and drop placeholder images inside `public/images`.
2. Restart the dev server if it was running (Next.js caches static imports during dev).

## Testing & linting

Run `npm run test` to execute Vitest. Test suites cover key UI components (filter bar & venue cards). Linting uses the default Next.js configuration plus a JSX prop ordering rule.

## Structure highlights

- `app/[locale]` – localized routes grouped by language (`/es` and `/en`). Spanish pages live under `app/[locale]/(es)`, English under `app/[locale]/(en)`.
- `components` – reusable UI (navigation, footer, cookie banner, forms, map, gallery, etc.).
- `lib` – analytics helper, venue utilities, i18n configuration, shared types.
- `content/venues` – structured venue data powering listings and detail pages.
- `public/images` – local image placeholders consumed by `next/image`.
- `tests` – Vitest test suites and helpers.

## Deployment

The project is optimized for Vercel:

1. Create a new Vercel project and import this repository.
2. Set the build command to `npm run build` and the output directory to `.next` (defaults).
3. Configure environment variables if you replace the placeholder Google Maps embed key.
4. Trigger the first deployment; Vercel will run install, build, and serve the production bundle.

