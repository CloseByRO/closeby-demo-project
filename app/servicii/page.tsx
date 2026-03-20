import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { ServicesSection } from '@/components/sections/services-section'
import { BookingSection } from '@/components/sections/booking-section'
import { SchemaBreadcrumb, SchemaMedicalWebPage } from '@/components/seo/schema'
import { formatPrice } from '@/lib/utils'

const pricedServices = clientConfig.services.filter((s) => s.price)

export const metadata: Metadata = {
  title: `Servicii Psihoterapie & Prețuri — ${clientConfig.address.sector} București`,
  description: `Servicii de psihoterapie în zona Pallady, ${clientConfig.address.sector}, București. ${pricedServices.slice(0, 2).map((s) => `${s.title} ${formatPrice(s.price, s.currency)}`).join(', ')}. Terapie individuală, de cuplu și online. Prima consultație gratuită.`,
  keywords: [
    'servicii psihoterapie sector 3',
    'pretul unei sedinte de psihologie bucuresti',
    'terapie cognitiv comportamentala pret',
    'cabinet psihologie pallady',
    'psihoterapeut titan pret sedinta',
    'terapie de cuplu sector 3 bucuresti',
    'sedinta psihologie online bucuresti',
    'evaluare psihologica sector 3',
  ],
  alternates: { canonical: '/servicii' },
  openGraph: {
    title: `Servicii & Prețuri — Cabinet Psihoterapie ${clientConfig.shortName}`,
    description: `Psihoterapie individuală, de cuplu și online în ${clientConfig.address.sector}, București. Prețuri transparente.`,
    url: `${clientConfig.website}/servicii`,
    locale: 'ro_RO',
    type: 'website',
  },
}

export default function ServiciiPage() {
  return (
    <>
      <SchemaMedicalWebPage
        config={clientConfig}
        pageUrl={`${clientConfig.website}/servicii`}
        pageName={`Servicii Psihoterapie în ${clientConfig.address.sector} București — Cabinet ${clientConfig.shortName}`}
        pageDescription={`Terapie individuală CBT, terapie de cuplu, consultații online și evaluare psihologică. Cabinet în zona Pallady, ${clientConfig.address.sector}.`}
      />
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: 'Servicii & Prețuri', url: `${clientConfig.website}/servicii` },
      ]} />
      <div className="pt-16">
        <ServicesSection config={clientConfig} />
        <BookingSection config={clientConfig} />
      </div>
    </>
  )
}
