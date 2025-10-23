'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

interface CareersFormProps {
  labels: {
    name: string;
    email: string;
    role: string;
    message: string;
    cv: string;
    submit: string;
    success: string;
  };
  locale: 'es' | 'en';
}

export function CareersForm({ labels, locale }: CareersFormProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('success');
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col text-sm font-semibold text-ink/70 dark:text-white/70">
          {labels.name}
          <input
            type="text"
            name="name"
            required
            className="mt-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-base shadow-sm focus:border-olive-500 dark:border-white/20 dark:bg-neutral-900"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold text-ink/70 dark:text-white/70">
          {labels.email}
          <input
            type="email"
            name="email"
            required
            className="mt-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-base shadow-sm focus:border-olive-500 dark:border-white/20 dark:bg-neutral-900"
          />
        </label>
      </div>
      <label className="flex flex-col text-sm font-semibold text-ink/70 dark:text-white/70">
        {labels.role}
        <input
          type="text"
          name="role"
          className="mt-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-base shadow-sm focus:border-olive-500 dark:border-white/20 dark:bg-neutral-900"
        />
      </label>
      <label className="flex flex-col text-sm font-semibold text-ink/70 dark:text-white/70">
        {labels.message}
        <textarea
          name="message"
          rows={4}
          className="mt-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-base shadow-sm focus:border-olive-500 dark:border-white/20 dark:bg-neutral-900"
        />
      </label>
      <label className="flex flex-col text-sm font-semibold text-ink/70 dark:text-white/70">
        {labels.cv}
        <input
          type="url"
          name="cv"
          placeholder="https://"
          className="mt-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-base shadow-sm focus:border-olive-500 dark:border-white/20 dark:bg-neutral-900"
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-olive-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-olive-600"
        data-analytics={`careers-submit-${locale}`}
      >
        {labels.submit}
      </button>
      {status === 'success' && (
        <p className="text-sm text-olive-600">{labels.success}</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600">{locale === 'es' ? 'Ha ocurrido un error.' : 'Something went wrong.'}</p>
      )}
    </form>
  );
}
