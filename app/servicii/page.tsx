import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { ServicesSection } from '@/components/sections/services-section'
import { BookingSection } from '@/components/sections/booking-section'
import { SchemaBreadcrumb } from '@/components/seo/schema'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Servicii & Prețuri',
  description: `Servicii de psihoterapie în ${clientConfig.address.sector} ${clientConfig.address.city}. ${clientConfig.services.filter(s => s.price).map(s => `${s.title} ${formatPrice(s.price, s.currency)}`).slice(0, 3).join(', ')}.`,
  alternates: { canonical: '/servicii' },
}

export default function ServiciiPage() {
  return (
    <>
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: 'Servicii', url: `${clientConfig.website}/servicii` },
      ]} />
      <div className="pt-16">
        <ServicesSection config={clientConfig} />
        <BookingSection config={clientConfig} />
      </div>
    </>
  )
}
