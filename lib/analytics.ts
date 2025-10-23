'use client';

import { useCallback } from 'react';

export function useAnalytics(eventName: string) {
  const handleClick = useCallback(() => {
    console.info(`[analytics] ${eventName}`);
  }, [eventName]);

  return {
    'data-analytics': eventName,
    onClick: handleClick
  } as const;
}
