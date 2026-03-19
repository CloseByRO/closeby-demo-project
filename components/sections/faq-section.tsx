import type { ClientConfig } from '@/types/client-config'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { buildWhatsAppUrl } from '@/lib/utils'

export function FAQSection({ config }: { config: ClientConfig }) {
  const waUrl = buildWhatsAppUrl(
    config.integrations.whatsappNumber ?? '',
    'Bună ziua, am o întrebare despre serviciile dumneavoastră.'
  )

  return (
    <section id="faq" className="py-24 px-6 lg:px-10 bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* FAQ list */}
          <div>
            <span className="text-xs font-medium tracking-[0.1em] uppercase text-sage-d block mb-4">
              Întrebări frecvente
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-ink mb-10">
              {config.content.faqTitle}
            </h2>
            <FAQAccordion faqs={config.faqs} />
          </div>

          {/* CTA col */}
          <div className="flex flex-col justify-center">
            <h3 className="font-serif text-3xl font-medium text-ink mb-4">
              Ai o altă{' '}
              <em className="text-sage-d not-italic italic">întrebare?</em>
            </h3>
            <p className="text-ink-l text-[0.9375rem] mb-8 leading-relaxed">
              Scrie-mi direct sau sună — răspund personal la toate mesajele în maxim 24 de ore.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: '📞',
                  title: config.phoneDisplay,
                  sub: config.openingHoursDisplay,
                  href: `tel:${config.phone}`,
                },
                {
                  icon: '✉️',
                  title: config.email,
                  sub: 'Răspund în 24 de ore',
                  href: `mailto:${config.email}`,
                },
                ...(config.integrations.whatsappNumber
                  ? [{ icon: '💬', title: 'WhatsApp', sub: 'Răspund în max. 2 ore în zilele lucrătoare', href: waUrl, external: true }]
                  : []),
              ].map((m) => (
                <a
                  key={m.href}
                  href={m.href}
                  {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-sage-l/30 hover:border-sage-d hover:shadow-[0_4px_16px_rgba(122,158,135,0.12)] transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-sage-xl flex items-center justify-center text-lg flex-shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink">{m.title}</div>
                    <div className="text-xs text-ink-l mt-0.5">{m.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
