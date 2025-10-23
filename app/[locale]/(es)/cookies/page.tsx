import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Política de cookies | Grupo Andalucía'
};

export default function CookiesPage({ params }: { params: { locale: 'es' | 'en' } }) {
  if (params.locale !== 'es') {
    notFound();
  }

  return (
    <article className="space-y-6">
      <h1 className="font-display text-4xl text-ink dark:text-white">Política de cookies</h1>
      <p className="text-base text-ink/70 dark:text-white/70">
        Utilizamos cookies propias y de terceros para analizar la navegación, personalizar contenidos y recordar tus preferencias.
      </p>
      <p className="text-base text-ink/70 dark:text-white/70">
        Puedes configurar tu navegador para rechazar o eliminar las cookies. Continuar navegando implica aceptar su uso según esta política.
      </p>
      <p className="text-base text-ink/70 dark:text-white/70">
        Para cualquier duda, escribe a hola@grupoandalucia.es.
      </p>
    </article>
  );
}
