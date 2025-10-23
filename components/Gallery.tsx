import Image from 'next/image';

interface GalleryProps {
  images: string[];
  locale: 'es' | 'en';
  name: string;
}

export function Gallery({ images, locale, name }: GalleryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {images.map((src, index) => (
        <div key={src} className="relative aspect-video overflow-hidden rounded-3xl">
          <Image
            src={src}
            alt={`${name} ${locale === 'es' ? 'fotografía' : 'photography'} ${index + 1}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
