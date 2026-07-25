import type { Metadata } from 'next';
import './tokens.css';
import { AdminShell } from './components/AdminShell';

export const metadata: Metadata = {
  title: 'UniERP Admin',
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: '/admin-favicon.svg', type: 'image/svg+xml' },
      { url: '/admin-favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/admin-favicon.ico', sizes: 'any' },
    ],
    shortcut: '/admin-favicon.ico',
    apple: [
      { url: '/admin-apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
