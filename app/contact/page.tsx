import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { LocationSection } from '@/components/sections/location-section'
import { SchemaBreadcrumb, SchemaMedicalWebPage } from '@/components/seo/schema'
import { ContactForm } from '@/components/sections/contact-form'

export const metadata: Metadata = {
  title: `Contact — Cabinet Psihoterapie ${clientConfig.address.sector} Pallady`,
  description: `Cabinet psihoterapie ${clientConfig.shortName}, ${clientConfig.address.street}, zona Pallady, ${clientConfig.address.sector}, București. Tel: ${clientConfig.phoneDisplay}. Lângă metrou Anghel Saligny. Parcare disponibilă. Răspuns în 24h.`,
  keywords: [
    `cabinet psihologie pallady adresa`,
    `psiholog sector 3 langa metrou`,
    `cabinet psihoterapie anghel saligny`,
    `psiholog bd theodor pallady bucuresti`,
    `contact cabinet psihologie sector 3`,
    `cabinet psihoterapie programare telefon`,
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact & Locație — Cabinet ${clientConfig.shortName}`,
    description: `${clientConfig.address.street}, zona Pallady, ${clientConfig.address.sector}. Lângă metrou M2 Anghel Saligny.`,
    url: `${clientConfig.website}/contact`,
    locale: 'ro_RO',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <>
      <SchemaMedicalWebPage
        config={clientConfig}
        pageUrl={`${clientConfig.website}/contact`}
        pageName={`Contact & Locație — Cabinet Psihoterapie ${clientConfig.shortName}, ${clientConfig.address.sector} Pallady`}
        pageDescription={`${clientConfig.address.street}, zona Pallady, ${clientConfig.address.sector}, București. Lângă metrou M2 Anghel Saligny.`}
      />
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: 'Contact', url: `${clientConfig.website}/contact` },
      ]} />
      <div className="pt-16">
        <LocationSection config={clientConfig} />
        <ContactForm config={clientConfig} />
      </div>
    </>
  )
}
