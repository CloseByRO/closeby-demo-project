import type { ClientConfig } from '@/types/client-config'

export const demoConfig: ClientConfig = {
  id: 'demo_001',
  slug: 'ana-ionescu',
  name: 'Dr. Ana Ionescu',
  shortName: 'Ana Ionescu',
  credentials: 'Psihoterapeut acreditat Colegiul Psihologilor din România',
  bio: 'Sunt Ana Ionescu, psiholog clinician specialist și psihoterapeut acreditat în terapie cognitiv-comportamentală. Lucrez cu adulți care se confruntă cu anxietate, depresie, burnout, probleme relaționale sau care simt că vor mai mult de la viața lor. Cred că fiecare persoană are în ea resursele necesare pentru schimbare — rolul meu este să te ajut să le descoperi.',
  bioShort: 'Psiholog clinician specialist și psihoterapeut CBT acreditat în București, Sector 3.',
  approach: 'Terapie cognitiv-comportamentală (CBT)',
  approaches: [
    'Terapie cognitiv-comportamentală',
    'Mindfulness-Based CBT',
    'Terapie prin expunere',
    'Restructurare cognitivă',
  ],
  yearsExperience: 8,
  patientsHelped: 500,

  address: {
    street: 'Bd. Theodor Pallady, nr. 24',
    sector: 'Sector 3',
    city: 'București',
    postalCode: '032258',
    lat: 44.4135,
    lng: 26.1428,
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.1234!2d26.1428!3d44.4135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDI0JzQ4LjYiTiAyNsKwMDgnMzQuMSJF!5e0!3m2!1sro!2sro!4v1234567890',
    nearbyTransport: ['Metro M2 · Anghel Saligny (5 min)', 'Tramvai 19, 27, 40', 'Autobuz 246'],
    parking: 'Parcare publică disponibilă pe Bd. Pallady, stradă secundară fără restricții',
  },

  phone: '+40722000000',
  phoneDisplay: '0722 000 000',
  email: 'contact@ana-ionescu-psiholog.ro',
  website: 'https://ana-ionescu-psiholog.ro',
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  openingHoursDisplay: 'Luni-Vineri: 09:00-18:00',

  integrations: {
    calComUsername: 'marian-potoroaca-o5t1s6',
    calComEventSlugs: {
      initial: '15min',
      session: '30min',
      couple:  '30min',
    },
    googlePlaceId: 'ChIJxxxxxxxxxxxxxxxxx',
    whatsappNumber: '40722000000',
    whatsappMessage: 'Bună ziua, doresc să fac o programare.',
    reviewLink: 'https://g.page/r/XXXXX/review',
  },

  content: {
    heroTitle: 'Regăsește-ți',
    heroTitleAccent: 'echilibrul interior',
    heroSubtitle:
      'Psihoterapie cognitiv-comportamentală pentru adulți. Un spațiu sigur unde schimbarea reală devine posibilă, pas cu pas.',
    heroCta: 'Programează gratuit',
    heroCtaSecondary: 'Află mai multe',
    heroAvailability: 'Sector 3 · București · Disponibil online',
    aboutTitle: 'Psihoterapeut cu 8 ani lângă tine',
    servicesTitle: 'Cu ce te pot ajuta',
    servicesSubtitle:
      'Fiecare proces terapeutic este adaptat nevoilor tale specifice. Prețuri transparente, fără surprize.',
    faqTitle: 'Tot ce vrei să știi',
    reviewsTitle: 'Ce spun pacienții',
  },

  services: [
    {
      id: 's0',
      title: 'Consultație inițială',
      description:
        'Prima întâlnire este gratuită. Ne cunoaștem, înțeleg situația ta și stabilim dacă și cum putem lucra împreună.',
      duration: 30,
      currency: 'RON',
      calEventSlug: 'consultatie-initiala',
      icon: '🌱',
    },
    {
      id: 's1',
      title: 'Psihoterapie individuală',
      description:
        'Anxietate, depresie, burnout, probleme de stimă de sine, dificultăți relaționale, atacuri de panică. Abordare CBT structurată.',
      duration: 50,
      price: 280,
      currency: 'RON',
      calEventSlug: 'sedinta-individuala',
      icon: '🧠',
      featured: true,
    },
    {
      id: 's2',
      title: 'Terapie de cuplu',
      description:
        'Comunicare dificilă, conflicte repetitive, distanță emoțională sau crize de cuplu. Lucrăm pentru reconectare.',
      duration: 75,
      price: 390,
      currency: 'RON',
      calEventSlug: 'terapie-cuplu',
      icon: '💑',
    },
    {
      id: 's3',
      title: 'Terapie online',
      description: 'Același cadru profesional, din confortul casei tale. Disponibil prin Zoom sau Google Meet.',
      duration: 50,
      price: 250,
      currency: 'RON',
      calEventSlug: 'sedinta-online',
      icon: '💻',
    },
    {
      id: 's4',
      title: 'Evaluare psihologică',
      description: 'Evaluare standardizată pentru adulți: anxietate, depresie, personalitate. Raport scris inclus.',
      duration: 90,
      price: 450,
      currency: 'RON',
      calEventSlug: 'evaluare-psihologica',
      icon: '📊',
    },
    {
      id: 's5',
      title: 'Pachet 8 ședințe',
      description: 'Pachet recomandat pentru un proces terapeutic structurat. Economisești 15% față de prețul per ședință.',
      duration: 50,
      price: 1900,
      currency: 'RON',
      calEventSlug: 'sedinta-individuala',
      icon: '📦',
    },
  ],

  faqs: [
    {
      question: 'Cât durează o ședință de psihoterapie?',
      answer:
        'O ședință standard durează 50 de minute. Prima ședință (consultația inițială gratuită) durează 30 de minute și ne permite să ne cunoaștem și să evaluăm dacă putem lucra împreună.',
    },
    {
      question: 'Cât costă o ședință? Există prețuri transparente?',
      answer:
        'Toate prețurile sunt afișate transparent: consultație inițială gratuită, ședință individuală 280 RON / 50 min, terapie de cuplu 390 RON / 75 min. Plata se face la finalul ședinței, numerar sau transfer bancar.',
    },
    {
      question: 'Este confidențial ce discutăm?',
      answer:
        'Da, absolut. Confidențialitatea este o obligație deontologică fundamentală, conform Codului Colegiului Psihologilor din România. Tot ce discutăm rămâne strict între noi, cu excepțiile legale prevăzute de lege.',
    },
    {
      question: 'Cum se desfășoară prima ședință?',
      answer:
        'La prima întâlnire ne cunoaștem și discuți despre ceea ce te-a determinat să apelezi la terapie. Nu există întrebări greșite. Vei pleca cu claritate despre ce presupune procesul și cu un plan inițial de lucru.',
    },
    {
      question: 'Datele mele sunt în siguranță?',
      answer:
        'Sistemul de programare online folosește servere localizate în Frankfurt, Germania, în conformitate cu GDPR. Nu stocăm informații clinice sau diagnostice — doar datele de contact necesare programării.',
    },
  ],

  reviews: [
    {
      id: 'r1',
      author: 'M. Popescu',
      initials: 'MP',
      rating: 5,
      text: 'Am venit cu o anxietate care mă paralizase luni de zile. După 3 luni de terapie am reușit să mă întorc la muncă și să îmi recapăt viața. Dr. Ionescu știe cum să ajungă exact la rădăcina problemei.',
      timeAgo: 'acum 2 săptămâni',
    },
    {
      id: 'r2',
      author: 'A. Ionescu',
      initials: 'AI',
      rating: 5,
      text: 'Cel mai bun psiholog pe care l-am întâlnit. Nu dă sfaturi, te ajută să găsești singur răspunsurile. Sistemul de programare online e o binecuvântare — am rezervat ședința în 2 minute.',
      timeAgo: 'acum 1 lună',
      highlight: true,
    },
    {
      id: 'r3',
      author: 'R. Dumitrescu',
      initials: 'RD',
      rating: 5,
      text: 'Cabinetul e curat, liniștit, ușor de găsit lângă metrou. Am apreciat că prețurile sunt afișate clar pe site — nu am avut surprize. Recomand cu drag.',
      timeAgo: 'acum 3 săptămâni',
    },
  ],

  theme: {
    primaryColor: '#7a9e87',
    primaryDark: '#4d7a5e',
    primaryLight: '#f0f5f2',
    primaryXLight: '#e4eee8',
    accentColor: '#c4865a',
    accentLight: '#f9f0e9',
    inkColor: '#1a2018',
    inkMid: '#3d4a3a',
    inkLight: '#6b7868',
    creamColor: '#faf8f4',
    headingFont: 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500',
    bodyFont: 'DM+Sans:wght@300;400;500',
  },

  seo: {
    metaTitle: 'Psihoterapeut Sector 3 București | Dr. Ana Ionescu | Cabinet CBT',
    metaDescription:
      'Cabinet de psihoterapie cognitiv-comportamentală în Sectorul 3, București. Programări online disponibile. Ședință inițială gratuită. Acreditat Colegiul Psihologilor.',
    keywords: ['psihoterapeut sector 3', 'psiholog bucuresti', 'terapie cbt bucuresti', 'cabinet psihologie titan'],
  },

  images: {
    gallery: [],
  },

  gdpr: {
    privacyPolicyUrl: '/politica-confidentialitate',
    dataProcessorName: 'CloseBy Studio SRL',
    serverLocation: 'Frankfurt, Germania (EU)',
  },

  aggregateRating: {
    ratingValue: '4.9',
    reviewCount: 47,
  },
}
