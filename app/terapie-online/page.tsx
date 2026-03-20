import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { BookingSection } from '@/components/sections/booking-section'
import { SchemaBreadcrumb, SchemaMedicalWebPage, SchemaFAQ } from '@/components/seo/schema'

export const metadata: Metadata = {
  title: `Ședințe Psihoterapie Online București — ${clientConfig.shortName} | CBT`,
  description: `Psihoterapie online cu Dr. Ana Ionescu, psihoterapeut CBT acreditat. 250 RON / 50 min, prin Zoom sau Google Meet. Date stocate pe servere EU (GDPR). Prima consultație gratuită. Disponibil pentru toată România.`,
  keywords: [
    'psihoterapie online bucuresti',
    'psiholog online sector 3 bucuresti',
    'sedinta psihologie online pret romania',
    'psihoterapeut cbt online acreditat',
    'consiliere psihologica online bucuresti',
    'psiholog online gdpr servere eu',
    'terapie cognitiv comportamentala online bucuresti',
    'programare psiholog online sector 3',
  ],
  alternates: { canonical: '/terapie-online' },
  openGraph: {
    title: `Psihoterapie Online — ${clientConfig.shortName} | CBT | Date pe servere EU`,
    description: `Ședințe online 250 RON / 50 min. Zoom sau Google Meet. Date GDPR pe servere în Frankfurt, Germania.`,
    url: `${clientConfig.website}/terapie-online`,
    locale: 'ro_RO',
    type: 'website',
  },
}

const onlineFaqs = [
  {
    question: 'Sunt ședințele de psihoterapie online la fel de eficiente ca cele față în față?',
    answer: 'Da. Studiile clinice arată că terapia online are eficiență comparabilă cu cea în cabinet pentru anxietate, depresie și burnout. Principalele avantaje: flexibilitate de orar, fără timp pierdut în trafic, acces din orice locație din România sau din străinătate. Singura excepție este evaluarea psihologică, care necesită prezență fizică pentru anumite teste standardizate.',
  },
  {
    question: 'Sunt datele mele în siguranță la psihoterapia online?',
    answer: 'Da. Sistemul de programare online folosește Cal.com EU, cu servere în Frankfurt, Germania, conform GDPR. Ședințele se desfășoară prin Zoom (criptat end-to-end) sau Google Meet. Nu stocăm conținutul ședințelor — confidențialitatea este aceeași ca în cabinet.',
  },
  {
    question: 'Cât costă o ședință de psihoterapie online cu Dr. Ana Ionescu?',
    answer: '250 RON / 50 min. Plata se face prin transfer bancar, înainte sau după ședință. Nu există diferență de calitate față de ședința în cabinet — aceeași abordare CBT structurată, aceleași obiective, aceleași rezultate. Prima consultație (30 min) este gratuită.',
  },
]

export default function TerapieOnlinePage() {
  const onlineConfig = { ...clientConfig, faqs: onlineFaqs }

  return (
    <>
      <SchemaMedicalWebPage
        config={clientConfig}
        pageUrl={`${clientConfig.website}/terapie-online`}
        pageName={`Psihoterapie Online — Cabinet ${clientConfig.shortName} | CBT | București`}
        pageDescription={`Ședințe de psihoterapie online, 250 RON / 50 min. Date stocate pe servere EU (GDPR). Prima consultație gratuită.`}
      />
      <SchemaFAQ config={onlineConfig} />
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: 'Servicii', url: `${clientConfig.website}/servicii` },
        { name: 'Terapie Online', url: `${clientConfig.website}/terapie-online` },
      ]} />

      <div className="pt-16">
        <section className="py-20 px-6 lg:px-10 max-w-[1200px] mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-sage-xl text-sage-d px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-6">
              Disponibil online · Toată România · Date pe servere EU
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-medium leading-tight text-ink mb-6">
              Psihoterapie{' '}
              <em className="text-sage-d not-italic">online</em>{' '}
              cu rezultate reale
            </h1>
            <p className="text-lg text-ink-l leading-relaxed mb-8">
              Ședințe CBT prin Zoom sau Google Meet, cu aceeași calitate ca în cabinet.
              250 RON / 50 min, fără deplasare, din confortul casei tale.
              Date stocate pe servere în Frankfurt, Germania — GDPR compliant.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-sage-l rounded-xl p-6">
                <div className="text-2xl font-serif font-medium text-ink mb-1">250 RON</div>
                <div className="text-sm text-ink-l">per ședință / 50 min</div>
              </div>
              <div className="bg-sage-l rounded-xl p-6">
                <div className="text-2xl font-serif font-medium text-ink mb-1">Zoom / Meet</div>
                <div className="text-sm text-ink-l">criptat end-to-end</div>
              </div>
              <div className="bg-sage-l rounded-xl p-6">
                <div className="text-2xl font-serif font-medium text-ink mb-1">GDPR EU</div>
                <div className="text-sm text-ink-l">servere Frankfurt</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 lg:px-10 bg-cream max-w-[1200px] mx-auto">
          <h2 className="font-serif text-3xl font-medium text-ink mb-8">Întrebări frecvente despre terapia online</h2>
          <div className="space-y-6 max-w-3xl">
            {onlineFaqs.map((faq, i) => (
              <div key={i} className="border-b border-ink-xl pb-6">
                <h3 className="font-medium text-ink mb-2">{faq.question}</h3>
                <p className="text-ink-l leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <BookingSection config={clientConfig} />
      </div>
    </>
  )
}
