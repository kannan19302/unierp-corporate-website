'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { CONTENT_COLLECTIONS } from '../collections';
import { BrandingForm } from '../components/BrandingForm';
import { PagesEditor } from '../components/PagesEditor';
import { CollectionCrud } from '../components/CollectionCrud';
import { AbTestingStudio } from '../components/AbTestingStudio';
import { I18nStudio } from '../components/I18nStudio';

export default function ContentCollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = use(params);
  const meta = CONTENT_COLLECTIONS.find((c) => c.id === collection);
  if (!meta) notFound();

  if (meta.kind === 'singleton') return <BrandingForm />;
  if (meta.kind === 'pages') return <PagesEditor />;
  if (meta.kind === 'ab-testing') return <AbTestingStudio />;
  if (meta.kind === 'i18n') return <I18nStudio />;
  return <CollectionCrud collectionId={collection} />;
}
