import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
// Design-system tokens FIRST, this site's own CSS after.
//
// Order is the whole adoption strategy. This site was built outside the design
// system — 1,683 lines of its own CSS, 178 colour declarations, Tailwind v4 —
// and flipping it to Meridian wholesale would be a redesign of forty public
// routes with no way to verify them one by one. Importing tokens underneath
// instead is additive: every value this site already defines still wins (same
// specificity, later source order), so nothing moves today, while
// --brand-signal, --scope-*, the display scale and the Meridian palette become
// available to the routes as they are migrated onto EditorialShell.
//
// Both stylesheets, not one: `./styles` is tokens and layers only, `./styles.css`
// is the CSS-module bundle. globals.css never imports its sibling.
import '@kannan19302/ui/styles';
import '@kannan19302/ui/styles.css';

import './tailwind.css';
import './globals.css';
import './enterprise.css';
import './cosmic.css';
import { getSeoMetadata } from '@/lib/seo';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });


export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('/', {
    title: 'UniERP — Modular Enterprise Resource Planning Platform',
    description: 'Composable, industry-agnostic multi-tenant ERP platform with visual page builder, accounting, inventory, manufacturing, HR, and CRM.',
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      shortcut: '/favicon.ico',
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  });
}

// UniERP is a universe-themed product: dark is the canonical identity and the
// only background the cosmic/WebGL layers are tuned for. Light remains a
// first-class opt-in via the header toggle, persisted in localStorage.
const THEME_INIT_SCRIPT = `
try {
  // 'unerp.theme' — the key ThemeProvider uses in every other app. This site
  // used 'unierp-theme', so a visitor who chose light here and then signed in
  // landed on a dark product, and vice versa. The legacy key is read once and
  // migrated so the existing choice is not silently thrown away.
  var t = localStorage.getItem('unerp.theme');
  if (t !== 'light' && t !== 'dark') {
    var legacy = localStorage.getItem('unierp-theme');
    if (legacy === 'light' || legacy === 'dark') {
      t = legacy;
      localStorage.setItem('unerp.theme', legacy);
      localStorage.removeItem('unierp-theme');
    }
  }
  if (t !== 'light' && t !== 'dark') t = 'dark';
  document.documentElement.setAttribute('data-theme', t);
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* Scroll-reveal is JS-driven (IntersectionObserver / Framer whileInView).
            Without it every revealed section stays at opacity 0, so force them
            visible. `!important` is required to beat Framer's inline styles. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>
  .reveal, [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
</style>`,
          }}
        />
      </head>
      <body className={`grid-bg-pattern ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning style={{ position: 'relative', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
