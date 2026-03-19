import type { Metadata } from 'next'
import clientConfig from '@/config/client'
import { AboutSection } from '@/components/sections/about-section'
import { SchemaBreadcrumb } from '@/components/seo/schema'

export const metadata: Metadata = {
  title: 'Despre',
  description: `${clientConfig.shortName} — ${clientConfig.credentials}. ${clientConfig.bioShort}`,
  alternates: { canonical: '/despre' },
}

export default function DesprePage() {
  return (
    <>
      <SchemaBreadcrumb items={[
        { name: 'Acasă', url: clientConfig.website },
        { name: 'Despre', url: `${clientConfig.website}/despre` },
      ]} />
      <div className="pt-16">
        <AboutSection config={clientConfig} />
      </div>
    </>
  )
}
