import clientConfig from '@/config/client'
import { HeroSection } from '@/components/sections/hero-section'
import { ProofStrip } from '@/components/sections/proof-strip'
import { AboutSection } from '@/components/sections/about-section'
import { ServicesSection } from '@/components/sections/services-section'
import { ReviewsSection } from '@/components/sections/reviews-section'
import { BookingSection } from '@/components/sections/booking-section'
import { FAQSection } from '@/components/sections/faq-section'
import { LocationSection } from '@/components/sections/location-section'
import { SchemaFAQ } from '@/components/seo/schema'

export default function HomePage() {
  return (
    <>
      <SchemaFAQ config={clientConfig} />
      <HeroSection config={clientConfig} />
      <ProofStrip config={clientConfig} />
      <AboutSection config={clientConfig} />
      <ServicesSection config={clientConfig} />
      <ReviewsSection config={clientConfig} />
      <BookingSection config={clientConfig} />
      <FAQSection config={clientConfig} />
      <LocationSection config={clientConfig} />
    </>
  )
}
