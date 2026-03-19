import type { Metadata } from 'next'
import clientConfig from '@/config/client'

export const metadata: Metadata = {
  title: 'Termeni și Condiții',
  description: 'Termenii și condițiile de utilizare a serviciilor.',
  robots: { index: false },
}

export default function TermeniPage() {
  const { shortName, email, website } = clientConfig

  return (
    <div className="pt-24 pb-16 px-6 lg:px-10">
      <div className="max-w-[760px] mx-auto">
        <h1 className="font-serif text-3xl font-medium text-ink mb-2">Termeni și condiții</h1>
        <p className="text-ink-l text-sm mb-10">
          Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {[
          {
            title: '1. Serviciile oferite',
            content: `Cabinet Psihoterapie ${shortName} oferă servicii de psihoterapie individuală, de cuplu și consiliere psihologică. Serviciile sunt furnizate exclusiv de profesioniști acreditați conform legislației române.`,
          },
          {
            title: '2. Programări și anulări',
            content: 'Programările pot fi anulate cu minimum 24 de ore înainte de ședință. Anulările tardive sau neprezentarea pot fi facturate integral. Reprogramarea este posibilă cu anunț prealabil de minimum 24 de ore.',
          },
          {
            title: '3. Confidențialitate și secret profesional',
            content: 'Toate informațiile discutate în cadrul ședințelor sunt strict confidențiale, conform Codului Deontologic al Colegiului Psihologilor din România. Excepțiile legale (risc iminent de vătămare) sunt comunicate explicit.',
          },
          {
            title: '4. Plata serviciilor',
            content: 'Plata se efectuează la finalul fiecărei ședințe, numerar sau transfer bancar. Prețurile afișate pe site sunt în RON și includ TVA acolo unde este aplicabil.',
          },
          {
            title: '5. Proprietate intelectuală',
            content: `Tot conținutul site-ului ${website} (texte, imagini, design) este proprietatea Cabinet Psihoterapie ${shortName} și este protejat de legile privind drepturile de autor.`,
          },
          {
            title: '6. Contact',
            content: `Pentru orice întrebări legate de acești termeni: ${email}`,
          },
        ].map(section => (
          <div key={section.title} className="mb-8">
            <h2 className="font-serif text-xl font-medium text-ink mb-3">{section.title}</h2>
            <p className="text-ink-l text-[0.9375rem] leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
