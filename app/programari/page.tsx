import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { BookingSection } from '@/components/sections/booking-section'
import { SchemaBreadcrumb } from '@/components/seo/schema'

export const metadata: Metadata = {
  title: 'Programări Online',
  description: `Programează o ședință de psihoterapie cu ${clientConfig.shortName} în ${clientConfig.address.sector}, ${clientConfig.address.city}. Prima consultație gratuită. Rezervare online în 2 minute.`,
  alternates: { canonical: '/programari' },
}

export default function ProgramariPage() {
  return (
    <>
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: 'Programări', url: `${clientConfig.website}/programari` },
      ]} />
      <div className="pt-16">
        <BookingSection config={clientConfig} />
      </div>
    </>
  )
}
