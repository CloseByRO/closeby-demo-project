import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { FAQSection } from '@/components/sections/faq-section'
import { SchemaFAQ, SchemaBreadcrumb, SchemaMedicalWebPage } from '@/components/seo/schema'

export const metadata: Metadata = {
  title: `Întrebări despre Psihoterapie — Costuri, Durată, Confidențialitate`,
  description: `Răspunsuri complete la întrebările frecvente despre psihoterapie: cât costă o ședință, cât durează terapia, este confidențial, cum funcționează prima ședință. Cabinet ${clientConfig.shortName}, zona Pallady, ${clientConfig.address.sector}, București.`,
  keywords: [
    'cat costa o sedinta de psihologie sector 3',
    'cat dureaza o terapie cognitiv comportamentala',
    'este confidential ce discuti cu psihologul',
    'cum functioneaza prima sedinta de terapie',
    'cat de des merg la psiholog bucuresti',
    'diferenta psiholog psihoterapeut',
    'datele mele la psiholog sunt sigure',
    'programare psiholog sector 3 online',
  ],
  alternates: { canonical: '/faq' },
  openGraph: {
    title: `FAQ Psihoterapie — ${clientConfig.shortName} | Sector 3 București`,
    description: `Cât costă, cât durează, este confidențial? Răspunsuri oneste de la ${clientConfig.shortName}, psihoterapeut acreditat în ${clientConfig.address.sector}.`,
    url: `${clientConfig.website}/faq`,
    locale: 'ro_RO',
    type: 'website',
  },
}

export default function FAQPage() {
  return (
    <>
      <SchemaMedicalWebPage
        config={clientConfig}
        pageUrl={`${clientConfig.website}/faq`}
        pageName={`Întrebări Frecvente despre Psihoterapie — Cabinet ${clientConfig.shortName}`}
        pageDescription={`Răspunsuri la întrebările frecvente despre psihoterapie: costuri, durată, confidențialitate, prima ședință.`}
      />
      <SchemaFAQ config={clientConfig} />
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: 'Întrebări Frecvente', url: `${clientConfig.website}/faq` },
      ]} />
      <div className="pt-16">
        <FAQSection config={clientConfig} />
      </div>
    </>
  )
}
