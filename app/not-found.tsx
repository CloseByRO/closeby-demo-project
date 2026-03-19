import Link from 'next/link'
import clientConfig from '@/config/client'

export default function NotFound() {
  return (
    <div className="min-h-svh flex items-center justify-center px-6 pt-16">
      <div className="text-center max-w-md">
        <div className="font-serif text-8xl font-medium text-sage-xl mb-6">404</div>
        <h1 className="font-serif text-3xl font-medium text-ink mb-3">
          Pagina nu a fost găsită
        </h1>
        <p className="text-ink-l text-[0.9375rem] mb-8">
          Pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="bg-sage-d text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-ink transition-colors"
          >
            Înapoi acasă
          </Link>
          <Link
            href="#programare"
            className="text-sage-d text-sm font-medium border-b border-sage-d pb-0.5 hover:text-ink hover:border-ink transition-colors"
          >
            Programează-te
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-sage-l/30 text-sm text-ink-l">
          Sau contactează-ne direct:{' '}
          <a href={`tel:${clientConfig.phone}`} className="text-sage-d hover:underline">
            {clientConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  )
}
