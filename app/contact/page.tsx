import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { LocationSection } from '@/components/sections/location-section'
import { SchemaBreadcrumb } from '@/components/seo/schema'
import { ContactForm } from '@/components/sections/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contactează cabinetul ${clientConfig.shortName} — ${clientConfig.address.street}, ${clientConfig.address.sector} ${clientConfig.address.city}. Tel: ${clientConfig.phoneDisplay}. Răspuns în 24h.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
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
