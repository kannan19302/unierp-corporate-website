import type { Metadata } from 'next';
import { BlogClient } from './BlogClient';

export const metadata: Metadata = {
  title: 'UniERP Blog — Product Updates, Insights & Best Practices',
  description: 'Stay up-to-date with UniERP product updates, ERP best practices, customer success stories, and industry insights.',
};

export default function BlogPage() {
  return <BlogClient />;
}
