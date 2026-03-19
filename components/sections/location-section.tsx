import type { ClientConfig } from '@/types/client-config'

export function LocationSection({ config }: { config: ClientConfig }) {
  const { address } = config

  return (
    <section id="contact" className="py-24 px-6 lg:px-10 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-14">
          <span className="text-xs font-medium tracking-[0.1em] uppercase text-sage-d block mb-4">
            Locație
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-ink leading-tight">
            Ușor de ajuns{' '}
            <em className="text-sage-d not-italic italic">în {address.sector}</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="space-y-6">
            {[
              {
                icon: '📍',
                title: 'Adresă cabinet',
                content: `${address.street}\n${address.sector}, ${address.city}, ${address.postalCode}`,
              },
              {
                icon: '🚇',
                title: 'Transport public',
                content: address.nearbyTransport.join('\n'),
              },
              {
                icon: '🕘',
                title: 'Program',
                content: config.openingHoursDisplay + '\nSâmbătă: 10:00–14:00 (online)',
              },
              {
                icon: '🚗',
                title: 'Parcare',
                content: address.parking,
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-sage-xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="font-medium text-ink text-sm mb-1">{item.title}</div>
                  {item.content.split('\n').map((line, i) => (
                    <div key={i} className="text-sm text-ink-m leading-relaxed">{line}</div>
                  ))}
                </div>
              </div>
            ))}

            {/* Direct link to Maps */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.street + ', ' + address.sector + ', ' + address.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sage-xl text-sage-d px-5 py-3 rounded-full text-sm font-medium hover:bg-sage-l transition-colors mt-2"
            >
              Deschide în Google Maps →
            </a>
          </div>

          {/* Google Maps embed */}
          <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-sage-l/30 shadow-sm">
            {address.mapsEmbedUrl ? (
              <iframe
                src={address.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Locație cabinet ${config.shortName} — ${address.street}, ${address.sector}`}
              />
            ) : (
              /* Fallback if no embed URL configured */
              <div className="w-full h-full bg-sage-xl flex flex-col items-center justify-center gap-3 text-sage-d border-2 border-dashed border-sage-l rounded-2xl">
                <span className="text-4xl">🗺️</span>
                <div className="text-center">
                  <p className="font-medium text-sm">Google Maps embed</p>
                  <p className="text-xs opacity-60 mt-1">{address.street} · {address.sector}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
