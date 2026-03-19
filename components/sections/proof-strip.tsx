import type { ClientConfig } from '@/types/client-config'

export function ProofStrip({ config }: { config: ClientConfig }) {
  const items = [
    { value: `${config.yearsExperience}+`, label: 'ani de experiență' },
    { value: `${config.patientsHelped}+`, label: 'pacienți ajutați' },
    { value: `${config.aggregateRating.ratingValue}★`, label: 'rating Google' },
    { value: 'Acreditat', label: 'Colegiul Psihologilor' },
    { value: 'GDPR', label: 'Date pe servere EU' },
  ]

  return (
    <div className="bg-sage-d py-5 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-wrap gap-6 lg:gap-12 items-center justify-center lg:justify-start">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-white/85 text-sm whitespace-nowrap">
            <strong className="font-serif text-xl font-semibold text-white">{item.value}</strong>
            {item.label}
            {i < items.length - 1 && (
              <span className="hidden lg:inline text-white/25 ml-6 text-2xl">·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
