'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { FAQ } from '@/types/client-config'

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={cn(
            'bg-white rounded-xl border transition-all duration-200',
            openIndex === i
              ? 'border-sage-l shadow-sm'
              : 'border-sage-l/30 hover:border-sage-l/60'
          )}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="flex items-center justify-between w-full px-6 py-5 text-left gap-4"
            aria-expanded={openIndex === i}
          >
            <span className={cn('font-medium text-[0.9375rem] transition-colors', openIndex === i ? 'text-sage-d' : 'text-ink')}>
              {faq.question}
            </span>
            <span
              className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-lg flex-shrink-0 transition-all duration-200',
                openIndex === i ? 'bg-sage-d text-white rotate-45' : 'bg-sage-xl text-sage-d'
              )}
            >
              +
            </span>
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              openIndex === i ? 'max-h-64' : 'max-h-0'
            )}
          >
            <p className="px-6 pb-5 text-sm text-ink-l leading-relaxed"
               dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
