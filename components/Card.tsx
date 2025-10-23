import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-3xl bg-white/80 p-6 shadow-soft backdrop-blur-sm transition-colors dark:bg-neutral-900/80 ${className}`}>
      {children}
    </div>
  );
}
