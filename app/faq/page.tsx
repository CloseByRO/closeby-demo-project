import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { FAQSection } from '@/components/sections/faq-section'
import { SchemaFAQ, SchemaBreadcrumb } from '@/components/seo/schema'

export const metadata: Metadata = {
  title: 'Întrebări Frecvente',
  description: `Răspunsuri la cele mai frecvente întrebări despre psihoterapie — durată, costuri, confidențialitate, prima ședință. Cabinet ${clientConfig.shortName}, ${clientConfig.address.sector} ${clientConfig.address.city}.`,
  alternates: { canonical: '/faq' },
}

export default function FAQPage() {
  return (
    <>
      <SchemaFAQ config={clientConfig} />
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: 'FAQ', url: `${clientConfig.website}/faq` },
      ]} />
      <div className="pt-16">
        <FAQSection config={clientConfig} />
      </div>
    </>
  )
}
