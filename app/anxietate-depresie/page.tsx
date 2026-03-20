import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { ServicesSection } from '@/components/sections/services-section'
import { BookingSection } from '@/components/sections/booking-section'
import { FAQSection } from '@/components/sections/faq-section'
import { SchemaBreadcrumb, SchemaMedicalWebPage, SchemaFAQ } from '@/components/seo/schema'

export const metadata: Metadata = {
  title: `Terapie Anxietate & Depresie Sector 3 București — CBT | ${clientConfig.shortName}`,
  description: `Psiholog specializat în anxietate, depresie și atacuri de panică în zona Pallady, Sector 3, București. Terapie cognitiv-comportamentală (CBT) cu rezultate în 8–16 ședințe. Prima consultație gratuită. Programare online în 2 minute.`,
  keywords: [
    'psiholog anxietate sector 3 bucuresti',
    'tratament depresie terapie cbt sector 3',
    'psiholog atacuri de panica pallady bucuresti',
    'terapie anxietate pret sector 3',
    'psiholog burnout sector 3 langa metrou',
    'cabinet psihologie anxietate pallady',
    'depresie anxietate tratament fara medicamente bucuresti',
    'psihoterapeut cbt anxietate sector 3 pret sedinta',
  ],
  alternates: { canonical: '/anxietate-depresie' },
  openGraph: {
    title: `Terapie Anxietate & Depresie — Cabinet ${clientConfig.shortName}, Sector 3 Pallady`,
    description: `CBT pentru anxietate, depresie și burnout în zona Pallady, Sector 3. Prima consultație gratuită.`,
    url: `${clientConfig.website}/anxietate-depresie`,
    locale: 'ro_RO',
    type: 'website',
  },
}

const anxietateFaqs = [
  {
    question: 'Poate terapia CBT trata anxietatea fără medicamente?',
    answer: 'Da. Terapia cognitiv-comportamentală este considerată tratamentul de primă linie pentru anxietate și atacuri de panică, cu eficiență dovedită în studii clinice. Majoritatea clienților văd îmbunătățiri semnificative în 8–12 ședințe, fără a fi necesare medicamente. În cazuri moderate-severe, medicamentele pot fi combinate cu terapia, dar decizia aparține unui psihiatru.',
  },
  {
    question: 'Câte ședințe sunt necesare pentru anxietate sau depresie?',
    answer: 'Pentru anxietate ușor-moderată, CBT dă rezultate în 8–16 ședințe. Depresia poate necesita 12–20 de ședințe, în funcție de severitate și de durata simptomelor. La cabinetul Dr. Ana Ionescu din zona Pallady, Sector 3, stabilim un plan clar la prima ședință (gratuită) și evaluăm progresul periodic.',
  },
  {
    question: 'Cum știu dacă am anxietate și am nevoie de psiholog?',
    answer: 'Simptomele frecvente includ: îngrijorare excesivă și dificil de controlat, tensiune musculară, probleme de somn, atacuri de panică (palpitații, senzație de sufocare, teamă de a-și pierde controlul), evitarea situațiilor care provoacă frică. Dacă aceste simptome îți afectează viața de zi cu zi de mai mult de 2 săptămâni, o consultație este recomandată.',
  },
]

export default function AnxietateDepresiePage() {
  const anxietateConfig = { ...clientConfig, faqs: anxietateFaqs }

  return (
    <>
      <SchemaMedicalWebPage
        config={clientConfig}
        pageUrl={`${clientConfig.website}/anxietate-depresie`}
        pageName={`Terapie Anxietate și Depresie prin CBT — Cabinet ${clientConfig.shortName}, Pallady, Sector 3 București`}
        pageDescription={`Terapie cognitiv-comportamentală pentru anxietate, depresie și atacuri de panică. Cabinet în zona Pallady, Sector 3, București. Prima consultație gratuită.`}
      />
      <SchemaFAQ config={anxietateConfig} />
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: 'Servicii', url: `${clientConfig.website}/servicii` },
        { name: 'Anxietate & Depresie', url: `${clientConfig.website}/anxietate-depresie` },
      ]} />

      <div className="pt-16">
        <section className="py-20 px-6 lg:px-10 max-w-[1200px] mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-sage-xl text-sage-d px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-6">
              Sector 3 · Zona Pallady · Lângă metrou Anghel Saligny
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-medium leading-tight text-ink mb-6">
              Terapie pentru{' '}
              <em className="text-sage-d not-italic">anxietate & depresie</em>{' '}
              în Sectorul 3
            </h1>
            <p className="text-lg text-ink-l leading-relaxed mb-8">
              Dacă anxietatea, depresia sau atacurile de panică îți afectează viața de zi cu zi,
              terapia cognitiv-comportamentală (CBT) oferă rezultate clare în 8–16 ședințe.
              Cabinet în zona Pallady, Bd. Theodor Pallady 24, Sector 3 — lângă metroul Anghel Saligny.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {['Anxietate generalizată', 'Atacuri de panică', 'Depresie', 'Burnout'].map((s) => (
                <div key={s} className="bg-sage-xl text-sage-d text-sm font-medium px-4 py-3 rounded-xl text-center">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServicesSection config={clientConfig} />
        <FAQSection config={anxietateConfig} />
        <BookingSection config={clientConfig} />
      </div>
    </>
  )
}
