import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { BookingSection } from '@/components/sections/booking-section'
import { SchemaBreadcrumb, SchemaMedicalWebPage } from '@/components/seo/schema'

export const metadata: Metadata = {
  title: `Programare Online Psihoterapie — ${clientConfig.address.sector} București`,
  description: `Programează o ședință de psihoterapie cu ${clientConfig.shortName} în zona Pallady, ${clientConfig.address.sector}, București. Prima consultație gratuită (30 min). Rezervare online simplă, date stocate pe servere EU (GDPR).`,
  keywords: [
    'programare psiholog sector 3 online',
    'rezervare sedinta psihoterapie bucuresti',
    'programare cabinet psihologie pallady',
    'consultatie gratuita psiholog bucuresti',
    'programare psiholog titan sector 3',
    'cum ma programez la psiholog bucuresti',
  ],
  alternates: { canonical: '/programari' },
  openGraph: {
    title: `Programare Online — ${clientConfig.shortName} | Psihoterapeut Sector 3`,
    description: `Prima consultație gratuită. Rezervare în 2 minute. Cabinet în zona Pallady, ${clientConfig.address.sector}, București.`,
    url: `${clientConfig.website}/programari`,
    locale: 'ro_RO',
    type: 'website',
  },
}

export default function ProgramariPage() {
  return (
    <>
      <SchemaMedicalWebPage
        config={clientConfig}
        pageUrl={`${clientConfig.website}/programari`}
        pageName={`Programare Online Psihoterapie — Cabinet ${clientConfig.shortName}, ${clientConfig.address.sector} București`}
        pageDescription={`Rezervă o ședință de psihoterapie online. Prima consultație gratuită. Date stocate pe servere EU, GDPR compliant.`}
      />
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: 'Programări Online', url: `${clientConfig.website}/programari` },
      ]} />
      <div className="pt-16">
        <BookingSection config={clientConfig} />
      </div>
    </>
  )
}
