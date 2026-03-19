'use client'
import { useState } from 'react'
import type { ClientConfig } from '@/types/client-config'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm({ config }: { config: Pick<ClientConfig, 'gdpr'> }) {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '', gdprConsent: false })

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Eroare necunoscută')
      setState('success')
      setForm({ name: '', email: '', message: '', gdprConsent: false })
    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Eroare la trimitere. Vă rugăm contactați-ne telefonic.')
    }
  }

  if (state === 'success') {
    return (
      <div className="py-16 px-6 lg:px-10 bg-sage-xl">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-5xl mb-4">✓</div>
          <h3 className="font-serif text-2xl text-ink mb-2">Mesaj trimis cu succes</h3>
          <p className="text-ink-l text-sm">Vom reveni cu un răspuns în maxim 24 de ore.</p>
          <button
            onClick={() => setState('idle')}
            className="mt-6 text-sm text-sage-d underline"
          >
            Trimite alt mesaj
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 px-6 lg:px-10 bg-sage-xl">
      <div className="max-w-[640px] mx-auto">
        <div className="mb-8 text-center">
          <span className="text-xs font-medium tracking-[0.1em] uppercase text-sage-d block mb-3">
            Formular contact
          </span>
          <h2 className="font-serif text-3xl text-ink">Trimite un mesaj</h2>
          <p className="text-ink-l text-sm mt-2">Răspundem în maxim 24 de ore în zilele lucrătoare.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink-m mb-1.5">
                Nume <span className="text-clay">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={set('name')}
                required
                autoComplete="name"
                placeholder="Ana Popescu"
                className="w-full bg-white border border-sage-l rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-xl focus:outline-none focus:ring-2 focus:ring-sage-d/30 focus:border-sage-d transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-m mb-1.5">
                Email <span className="text-clay">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={set('email')}
                required
                autoComplete="email"
                placeholder="ana@email.ro"
                className="w-full bg-white border border-sage-l rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-xl focus:outline-none focus:ring-2 focus:ring-sage-d/30 focus:border-sage-d transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink-m mb-1.5">
              Mesaj <span className="text-clay">*</span>
            </label>
            <textarea
              id="message"
              value={form.message}
              onChange={set('message')}
              required
              rows={5}
              placeholder="Bună ziua, aș dori să aflu mai multe despre..."
              className="w-full bg-white border border-sage-l rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-xl focus:outline-none focus:ring-2 focus:ring-sage-d/30 focus:border-sage-d transition-colors resize-none"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="gdpr"
              type="checkbox"
              checked={form.gdprConsent}
              onChange={set('gdprConsent')}
              required
              className="mt-1 w-4 h-4 accent-sage-d flex-shrink-0 cursor-pointer"
            />
            <label htmlFor="gdpr" className="text-xs text-ink-l leading-relaxed cursor-pointer">
              Sunt de acord cu prelucrarea datelor personale conform{' '}
              <a href={config.gdpr.privacyPolicyUrl} className="text-sage-d underline">
                Politicii de confidențialitate
              </a>
              . Datele sunt procesate de {config.gdpr.dataProcessorName} pe servere în{' '}
              {config.gdpr.serverLocation}.
            </label>
          </div>

          {state === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={state === 'loading' || !form.gdprConsent}
            className="w-full bg-sage-d text-white py-4 rounded-full text-[0.9375rem] font-medium hover:bg-ink transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {state === 'loading' ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Se trimite...
              </>
            ) : (
              'Trimite mesajul →'
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
