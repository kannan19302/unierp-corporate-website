import { NextResponse } from 'next/server';
import { requireAdminTenant } from '@/lib/auth';

const LOCALES = [
  { code: 'en', name: 'English (US)', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish (Español)', flag: '🇪🇸' },
  { code: 'de', name: 'German (Deutsch)', flag: '🇩🇪' },
  { code: 'fr', name: 'French (Français)', flag: '🇫🇷' },
  { code: 'ja', name: 'Japanese (日本語)', flag: '🇯🇵' },
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'hero.title': 'The Universal ERP Operating System',
    'hero.tagline': 'Unify Finance, Supply Chain, HR, and Analytics on one AI platform.',
    'cta.demo': 'Launch Interactive Demo',
    'cta.contact': 'Contact Enterprise Sales',
  },
  hi: {
    'hero.title': 'सार्वभौमिक ईआरपी ऑपरेटिंग सिस्टम',
    'hero.tagline': 'एक ही एआई प्लेटफॉर्म पर वित्त, आपूर्ति श्रृंखला, एचआर का संचालन करें।',
    'cta.demo': 'इंटरैक्टिव डेमो लॉन्च करें',
    'cta.contact': 'सेल से संपर्क करें',
  },
  es: {
    'hero.title': 'El Sistema Operativo ERP Universal',
    'hero.tagline': 'Unifique Finanzas, Cadena de Suministro y RRHH en una plataforma IA.',
    'cta.demo': 'Iniciar Demostración Interactiva',
    'cta.contact': 'Contactar Ventas Enterprise',
  },
};

export async function GET(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  return NextResponse.json({ success: true, locales: LOCALES, translations: TRANSLATIONS });
}

export async function POST(req: Request) {
  const auth = await requireAdminTenant(req);
  if ('error' in auth) return auth.error;

  const { locale } = await req.json();
  // Simulate AI Auto-Translation for requested locale
  return NextResponse.json({
    success: true,
    message: `Successfully AI auto-translated all missing keys for ${locale.toUpperCase()}`,
  });
}
