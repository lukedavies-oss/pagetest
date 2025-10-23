interface MapProps {
  lat: number;
  lng: number;
  title: string;
}

export function Map({ lat, lng, title }: MapProps) {
  const src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD-ExampleKey&q=${encodeURIComponent(title)}&center=${lat},${lng}&zoom=15`;

  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 shadow-soft dark:border-white/10">
      <iframe
        src={src}
        title={title}
        width="100%"
        height="320"
        loading="lazy"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
