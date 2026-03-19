import type { ClientConfig } from '@/types/client-config'

export function MobileBar({ config }: { config: Pick<ClientConfig, 'phone' | 'phoneDisplay'> }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-sage/15 flex gap-3 px-5 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <a
        href={`tel:${config.phone}`}
        className="flex-1 bg-sage-xl text-sage-d font-medium text-sm text-center py-3 rounded-full"
      >
        📞 Sună acum
      </a>
      <a
        href="#programare"
        className="flex-[2] bg-sage-d text-white font-medium text-sm text-center py-3 rounded-full"
      >
        Programează-te →
      </a>
    </div>
  )
}
