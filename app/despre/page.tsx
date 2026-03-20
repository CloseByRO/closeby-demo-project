import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { AboutSection } from '@/components/sections/about-section'
import { SchemaBreadcrumb, SchemaMedicalWebPage } from '@/components/seo/schema'

export const metadata: Metadata = {
  title: `Despre ${clientConfig.shortName} — Psihoterapeut CBT Sector 3`,
  description: `${clientConfig.shortName}, ${clientConfig.credentials}. ${clientConfig.yearsExperience} ani experiență în terapie cognitiv-comportamentală. Cabinet în zona Pallady, Sector 3, București. Prima consultație gratuită.`,
  keywords: [
    `psiholog ${clientConfig.address.sector.toLowerCase()} bucuresti`,
    `psihoterapeut pallady`,
    `cabinet psihoterapie titan bucuresti`,
    `terapeut cbt sector 3`,
    `${clientConfig.shortName.toLowerCase()} psihoterapeut`,
  ],
  alternates: { canonical: '/despre' },
  openGraph: {
    title: `${clientConfig.shortName} — Psihoterapeut acreditat Sector 3 București`,
    description: `${clientConfig.bioShort} ${clientConfig.yearsExperience} ani experiență. Cabinet în zona Pallady.`,
    url: `${clientConfig.website}/despre`,
    locale: 'ro_RO',
    type: 'profile',
  },
}

export default function DesprePage() {
  return (
    <>
      <SchemaMedicalWebPage
        config={clientConfig}
        pageUrl={`${clientConfig.website}/despre`}
        pageName={`Despre ${clientConfig.shortName} — Psihoterapeut CBT Sector 3 București`}
        pageDescription={`${clientConfig.shortName}, ${clientConfig.credentials}. Cabinet în zona Pallady, Sector 3, București.`}
      />
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: `Despre ${clientConfig.shortName}`, url: `${clientConfig.website}/despre` },
      ]} />
      <div className="pt-16">
        <AboutSection config={clientConfig} />
      </div>
    </>
  )
}
