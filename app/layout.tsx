import React from 'react';
import './globals.css';

export const metadata = {
  title: 'UniERP — Modular Enterprise Resource Planning Platform',
  description: 'Composable, industry-agnostic multi-tenant ERP platform with visual page builder, accounting, inventory, manufacturing, HR, and CRM.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
