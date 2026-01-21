import { Brand, Product } from './types';

export const BRANDS: Brand[] = [
  { 
    id: 'kenworth', 
    name: 'KENWORTH', 
    logo: '🚛', 
    color: '#C4161C', 
    models: ['T800', 'T880', 'T680', 'Aerocab', 'W900'], 
    description: {
      es: 'Kenworth es sinónimo de calidad y durabilidad en tractocamiones de clase mundial.',
      en: 'Kenworth is synonymous with quality and durability in world-class trucks.'
    }
  },
  { 
    id: 'international', 
    name: 'INTERNATIONAL', 
    logo: '🚚', 
    color: '#00529B', 
    models: ['Eagle', 'Workstar', 'Prostar', 'Durastar', 'LT', 'HV'], 
    description: {
      es: 'International ofrece soluciones versátiles para transporte pesado y trabajo intensivo.',
      en: 'International offers versatile solutions for heavy transport and intensive work.'
    }
  },
  { 
    id: 'freightliner', 
    name: 'FREIGHTLINER', 
    logo: '🛻', 
    color: '#004C97', 
    models: ['Columbia', 'Cascadia 2012', 'Cascadia 2020', 'M2 106'], 
    description: {
      es: 'Freightliner lidera la eficiencia y tecnología para tractocamiones.',
      en: 'Freightliner leads in efficiency and technology for trucks.'
    }
  },
  { 
    id: 'mack', 
    name: 'MACK', 
    logo: '🐕', 
    color: '#FFB81C', 
    models: ['Anthem', 'Pinnacle', 'Granite'], 
    description: {
      es: 'Mack Trucks, construidos como un Mack, potencia y durabilidad.',
      en: 'Mack Trucks, built like a Mack, power and durability.'
    }
  }
];

export const CATEGORIES = [
  { id: 'bompers', es: '1️⃣ BOMPERS', en: '1️⃣ BUMPERS' },
  { id: 'capo', es: '2️⃣ CAPÓ', en: '2️⃣ HOOD' },
  { id: 'cabina', es: '3️⃣ CABINA', en: '3️⃣ CABIN' },
  { id: 'estribos', es: '4️⃣ ESTRIBOS', en: '4️⃣ STEPS' },
  { id: 'chasis', es: '5️⃣ CHASIS', en: '5️⃣ CHASSIS' },
];

export const PRODUCTS: Product[] = [
  { 
    id: 'b1', 
    name: { es: 'Bomper tipo ranchero', en: 'Ranch-style Bumper' }, 
    category: 'bompers', 
    image: 'https://picsum.photos/id/111/500/500', 
    description: { 
      es: 'Defensa frontal reforzada en acero inoxidable calibre pesado.',
      en: 'Heavy-duty stainless steel front bumper ranch-style.'
    }, 
    compatibleModels: ['Kenworth', 'International'] 
  },
  { 
    id: 'b2', 
    name: { es: 'Bomper tipo sesgado', en: 'Angled Bumper' }, 
    category: 'bompers', 
    image: 'https://picsum.photos/id/133/500/500', 
    description: { 
      es: 'Diseño aerodinámico premium con acabados en acero inoxidable espejo.',
      en: 'Premium aerodynamic design with mirror-finish stainless steel.'
    }, 
    compatibleModels: ['Kenworth', 'Freightliner'] 
  },
  { 
    id: 'ca1', 
    name: { es: 'Cornetas de Aire', en: 'Air Horns' }, 
    category: 'cabina', 
    image: 'https://picsum.photos/id/420/500/500', 
    description: { 
      es: 'Bocinas de aire en acero inoxidable de largo alcance.',
      en: 'Long-range stainless steel air horns.'
    }, 
    compatibleModels: ['Universal'] 
  },
  { 
    id: 'c6', 
    name: { es: 'Emblema del Capó', en: 'Hood Emblem' }, 
    category: 'capo', 
    image: 'https://picsum.photos/id/370/500/500', 
    description: { 
      es: 'Insignias decorativas de lujo en acero inoxidable 304.',
      en: 'Luxury decorative badges in 304 stainless steel.'
    }, 
    compatibleModels: ['Mack', 'Kenworth'] 
  }
];

export const UI_TEXT = {
  es: {
    heroTitle: 'EL PODER DEL ACERO INOX',
    heroSubtitle: 'Lujos y accesorios de acero inoxidable premium para tu tractomula.',
    selectBrand: 'SELECCIONA TU MARCA',
    selectModel: 'Selecciona el Modelo',
    back: 'Volver a Marcas',
    catalogFor: 'CATÁLOGO PARA',
    services: 'SERVICIOS',
    contact: 'CONTACTO',
    quote: 'COTIZAR YA',
    stock: 'EN STOCK',
    empty: 'Próximamente más productos...',
    footer: 'EXPERTOS EN ACERO INOXIDABLE Y LUJOS'
  },
  en: {
    heroTitle: 'STAINLESS STEEL POWER',
    heroSubtitle: 'Premium stainless steel accessories for your heavy-duty truck.',
    selectBrand: 'SELECT YOUR BRAND',
    selectModel: 'Select Model',
    back: 'Back to Brands',
    catalogFor: 'CATALOG FOR',
    services: 'SERVICES',
    contact: 'CONTACT',
    quote: 'QUOTE NOW',
    stock: 'IN STOCK',
    empty: 'More products coming soon...',
    footer: 'EXPERTS IN STAINLESS STEEL AND LUXURY'
  }
};