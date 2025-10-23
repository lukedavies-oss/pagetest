import { render } from '@testing-library/react';
import { NextIntlProvider } from 'next-intl';
import type { ReactElement } from 'react';

export function renderWithIntl(ui: ReactElement, locale: 'es' | 'en', messages: Record<string, unknown>) {
  return render(
    <NextIntlProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlProvider>
  );
}
