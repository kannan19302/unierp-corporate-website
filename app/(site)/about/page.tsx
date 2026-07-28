import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: 'About UniERP — Our Mission, Team & Values',
  description: 'Learn about UniERP, the team building the composable ERP platform for modern businesses globally.',
};

export default function AboutPage() {
  return <AboutClient />;
}
