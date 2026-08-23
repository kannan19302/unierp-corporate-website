import type { Metadata } from 'next';
import { EventsClient } from './EventsClient';

export const metadata: Metadata = {
  title: 'UniERP Events & Webinars — Masterclasses, Keynotes & Product Demos',
  description: 'Join live webinars, architectural masterclasses, and executive roundtables led by enterprise ERP leaders.',
};

export default function EventsPage() {
  return <EventsClient />;
}
