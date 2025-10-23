import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FilterBar } from '@/components/FilterBar';
import { renderWithIntl } from './test-utils';
import esMessages from '@/lib/i18n/messages/es.json';

const replace = vi.fn();
const pathname = '/es/restaurantes';
const searchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
  usePathname: () => pathname,
  useSearchParams: () => searchParams
}));

describe('FilterBar', () => {
  it('renders filters and updates query params', () => {
    renderWithIntl(<FilterBar cities={['Sevilla', 'Málaga']} cuisines={['Tapas']} />, 'es', esMessages as unknown as Record<string, unknown>);

    expect(screen.getByLabelText(esMessages.filter.city)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(esMessages.filter.city), { target: { value: 'Sevilla' } });
    expect(replace).toHaveBeenCalledWith(`${pathname}?city=Sevilla`);
  });
});
