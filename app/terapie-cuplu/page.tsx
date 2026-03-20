import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { BookingSection } from '@/components/sections/booking-section'
import { SchemaBreadcrumb, SchemaMedicalWebPage, SchemaFAQ } from '@/components/seo/schema'

export const metadata: Metadata = {
  title: `Terapie de Cuplu Sector 3 București — Cabinet ${clientConfig.shortName} | Pallady`,
  description: `Terapie de cuplu și consiliere de relație în zona Pallady, Sector 3, București. Comunicare dificilă, conflicte repetitive, criză de cuplu. 390 RON / 75 min. Prima consultație la cerere. Cabinet lângă metrou Anghel Saligny.`,
  keywords: [
    'terapie de cuplu sector 3 bucuresti',
    'psiholog cuplu pallady bucuresti',
    'consiliere relationala sector 3',
    'terapeut cuplu sector 3 pret',
    'terapie mariaj sector 3 bucuresti',
    'conflicte cuplu psiholog sector 3',
    'cabinet psihologie terapie cuplu pallady',
    'consiliere cuplu langa metrou anghel saligny',
  ],
  alternates: { canonical: '/terapie-cuplu' },
  openGraph: {
    title: `Terapie de Cuplu Sector 3 — Cabinet ${clientConfig.shortName} | Pallady`,
    description: `Consiliere și terapie de cuplu în zona Pallady, Sector 3, București. 390 RON / 75 min.`,
    url: `${clientConfig.website}/terapie-cuplu`,
    locale: 'ro_RO',
    type: 'website',
  },
}

const cupleFaqs = [
  {
    question: 'Cât costă o ședință de terapie de cuplu în Sectorul 3?',
    answer: 'La cabinetul Dr. Ana Ionescu din zona Pallady, Sector 3, o ședință de terapie de cuplu costă 390 RON și durează 75 de minute. Programarea se face online, cu date stocate pe servere EU (GDPR). Nu există angajament obligatoriu de număr de ședințe.',
  },
  {
    question: 'Când ar trebui un cuplu să meargă la terapie?',
    answer: 'Terapia de cuplu este utilă în mai multe situații: comunicare constant conflictuală sau înghețată, infidelitate și reconstruirea încrederii, distanță emoțională sau pierderea intimității, probleme legate de parenting, crize de viață (mutare, pierdere job, deces). Nu trebuie să așteptați o criză majoră — terapia de cuplu funcționează și preventiv, pentru a consolida relația.',
  },
  {
    question: 'Funcționează terapia de cuplu dacă un partener nu vrea să vină?',
    answer: 'Dacă un partener refuză, cel care vine singur poate face progrese importante: înțelege mai bine dinamica relației, schimbă propriile pattern-uri și poate influența pozitiv relația. Uneori, după câteva ședințe individuale, celălalt partener devine mai deschis să participe. La cabinetul din Sector 3 oferim atât terapie de cuplu, cât și ședințe individuale de suport relațional.',
  },
]

export default function TerapieCupluPage() {
  const cupleConfig = { ...clientConfig, faqs: cupleFaqs }

  return (
    <>
      <SchemaMedicalWebPage
        config={clientConfig}
        pageUrl={`${clientConfig.website}/terapie-cuplu`}
        pageName={`Terapie de Cuplu în Sector 3 București — Cabinet ${clientConfig.shortName}, Zona Pallady`}
        pageDescription={`Consiliere și terapie de cuplu pentru comunicare dificilă, conflicte, criză de cuplu. 390 RON / 75 min. Cabinet în zona Pallady, Sector 3.`}
      />
      <SchemaFAQ config={cupleConfig} />
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: 'Servicii', url: `${clientConfig.website}/servicii` },
        { name: 'Terapie de Cuplu', url: `${clientConfig.website}/terapie-cuplu` },
      ]} />

      <div className="pt-16">
        <section className="py-20 px-6 lg:px-10 max-w-[1200px] mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-sage-xl text-sage-d px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-6">
              Sector 3 · Zona Pallady · 75 min / 390 RON
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-medium leading-tight text-ink mb-6">
              Terapie de{' '}
              <em className="text-sage-d not-italic">cuplu</em>{' '}
              în Sectorul 3, București
            </h1>
            <p className="text-lg text-ink-l leading-relaxed mb-8">
              Comunicare dificilă, conflicte repetitive, pierderea intimității sau crize de cuplu —
              terapia vă ajută să reconstruiți legătura și să găsiți un nou limbaj comun.
              Cabinet în zona Pallady, Bd. Theodor Pallady 24, Sector 3, lângă metrou Anghel Saligny.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {['Comunicare dificilă', 'Conflicte repetitive', 'Infidelitate', 'Distanță emoțională', 'Criză de cuplu', 'Suport parenting'].map((s) => (
                <div key={s} className="bg-sage-xl text-sage-d text-sm font-medium px-4 py-3 rounded-xl text-center">
                  {s}
                </div>
              ))}
            </div>

            <div className="bg-sage-l rounded-2xl p-8 mb-10">
              <h2 className="font-serif text-2xl font-medium text-ink mb-4">Detalii ședință</h2>
              <ul className="space-y-2 text-ink-l">
                <li>⏱ <strong className="text-ink">75 minute</strong> — ședința de terapie de cuplu</li>
                <li>💳 <strong className="text-ink">390 RON</strong> — plata la finalul ședinței</li>
                <li>📍 <strong className="text-ink">Bd. Theodor Pallady 24</strong>, Sector 3, lângă M2 Anghel Saligny</li>
                <li>🔒 <strong className="text-ink">Confidențialitate totală</strong> — datele pe servere EU, GDPR</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 lg:px-10 bg-cream max-w-[1200px] mx-auto">
          <h2 className="font-serif text-3xl font-medium text-ink mb-8">Întrebări frecvente</h2>
          <div className="space-y-6 max-w-3xl">
            {cupleFaqs.map((faq, i) => (
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
