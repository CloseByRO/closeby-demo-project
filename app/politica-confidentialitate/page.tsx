import type { Metadata } from 'next'
import clientConfig from '@/config/client'

export const metadata: Metadata = {
  title: 'Politică de Confidențialitate',
  description: 'Politica de prelucrare a datelor cu caracter personal.',
  robots: { index: false },
}

export default function PoliticaPage() {
  const { gdpr, shortName, email, phone, website } = clientConfig

  return (
    <div className="pt-24 pb-16 px-6 lg:px-10">
      <div className="max-w-[760px] mx-auto prose prose-sm">
        <h1 className="font-serif text-3xl font-medium text-ink mb-2">
          Politică de confidențialitate
        </h1>
        <p className="text-ink-l text-sm mb-10">
          Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {[
          {
            title: '1. Cine suntem',
            content: `Cabinet Psihoterapie ${shortName}, operator de date cu caracter personal. Contact: ${email} · ${phone} · ${website}. Date prelucrate de ${gdpr.dataProcessorName}.`,
          },
          {
            title: '2. Ce date colectăm',
            content: 'Colectăm exclusiv date de contact necesare programărilor: nume, adresă de email, număr de telefon și data/ora programării. Nu colectăm și nu stocăm informații clinice, diagnostice sau note terapeutice.',
          },
          {
            title: '3. Scopul prelucrării',
            content: 'Datele sunt prelucrate în baza Art. 6 alin. (1) lit. b) GDPR (executarea unui contract) exclusiv pentru: confirmarea programărilor, trimiterea de remindere, comunicări legate de serviciile solicitate.',
          },
          {
            title: '4. Unde stocăm datele',
            content: `Toate datele de programare sunt stocate pe servere localizate în ${gdpr.serverLocation}, în conformitate cu GDPR. Nu transferăm date în afara Spațiului Economic European.`,
          },
          {
            title: '5. Cât timp păstrăm datele',
            content: 'Datele de programare sunt păstrate maximum 12 luni după ultima interacțiune. La cerere, datele pot fi șterse în termen de 30 de zile.',
          },
          {
            title: '6. Drepturile tale',
            content: `Ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție conform GDPR. Exercitarea drepturilor: ${email}. Poți depune plângere la ANSPDCP (www.dataprotection.ro).`,
          },
          {
            title: '7. Cookie-uri',
            content: 'Folosim exclusiv cookie-uri esențiale pentru funcționarea site-ului. Cookie-urile analitice sunt activate doar cu consimțământul tău explicit.',
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
