import { notFound } from 'next/navigation';
import { BlogPostClient } from './BlogPostClient';

const SAMPLE_POSTS: Record<string, any> = {
  'v38-manufacturing-mrp-ai-forecasting': {
    slug: 'v38-manufacturing-mrp-ai-forecasting',
    category: 'Product Update',
    title: 'UniERP v3.8: Enhanced Manufacturing MRP with AI Demand Forecasting',
    excerpt: 'Our latest release ships predictive demand forecasting powered by ML, a completely redesigned BOM editor, and 38 new quality management features.',
    date: 'July 22, 2026',
    readTime: '5 min',
    author: { name: 'Vikramaditya Sharma', role: 'VP of Product Engineering', avatar: 'VS' },
    content: [
      {
        heading: '1. Next-Generation Material Requirements Planning (MRP II)',
        body: 'Manufacturing teams constantly walk the tightrope between excess inventory carrying costs and catastrophic assembly line stockouts. In v3.8, UniERP introduces hierarchical BOM versioning linked directly with real-time supplier lead time telemetry.',
        codeSnippet: `// UniERP MRP Demand Forecasting Trigger\nconst forecast = await unierp.mrp.predictRequirement({\n  bomId: 'BOM-2026-X1',\n  leadTimeBufferDays: 14,\n  confidenceInterval: 0.98\n});`,
      },
      {
        heading: '2. Predictive ML Demand Forecasting',
        body: 'By analyzing historical seasonality, open sales pipelines from the CRM, and supply chain lead times, the forecasting engine automatically generates purchase requisitions before inventory crosses safety thresholds.',
      },
      {
        heading: '3. Real-Time Shop Floor Machine Telemetry',
        body: 'Direct integration with OPC-UA and MQTT machine sensors allows production managers to track work order progress, scrap rates, and overall equipment effectiveness (OEE) in sub-second intervals.',
      },
    ],
    relatedPosts: [
      { title: 'The 8 Most Common ERP Implementation Mistakes', slug: 'erp-implementation-mistakes', category: 'Best Practice', date: 'July 18, 2026' },
      { title: 'Building Multi-Tenant ERP at Scale', slug: 'multi-tenant-erp-architecture', category: 'Engineering', date: 'July 10, 2026' },
    ],
  },
  'erp-implementation-mistakes': {
    slug: 'erp-implementation-mistakes',
    category: 'Best Practice',
    title: 'The 8 Most Common ERP Implementation Mistakes (and How to Avoid Them)',
    excerpt: 'After helping companies go live, we have identified the key failure patterns. Here is what separates successful ERP implementations from costly disasters.',
    date: 'July 18, 2026',
    readTime: '9 min',
    author: { name: 'Ravi Sharma', role: 'Head of Enterprise Advisory', avatar: 'RS' },
    content: [
      {
        heading: 'Mistake #1: Attempting a Big-Bang Deployment Across All Departments',
        body: 'The most dangerous mistake is attempting to migrate Finance, HR, Inventory, Sales, and Manufacturing simultaneously on a single Monday morning. We recommend a phased roll-out: start with Finance & CRM, then activate Inventory, and finally roll out MRP.',
      },
      {
        heading: 'Mistake #2: Migrating Dirty Legacy Data Without Cleansing',
        body: 'Garbage in, garbage out. Cleanse your Chart of Accounts, deduplicate customer master records, and write off obsolete SKUs before running automated migration scripts into UniERP.',
      },
      {
        heading: 'Mistake #3: Underestimating Change Management and User Training',
        body: 'Software adoption is a human problem. UniERP consumer-grade UI reduces training time from months to days, but structured onboarding sessions remain critical for long-term ROI.',
      },
    ],
    relatedPosts: [
      { title: 'Finance Module Master Guide: From Chart of Accounts to Close', slug: 'finance-module-master-guide', category: 'Guide', date: 'July 6, 2026' },
      { title: 'UniERP v3.8: Enhanced Manufacturing MRP', slug: 'v38-manufacturing-mrp-ai-forecasting', category: 'Product Update', date: 'July 22, 2026' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(SAMPLE_POSTS).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = SAMPLE_POSTS[slug] || {
    slug,
    category: 'Insight',
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    excerpt: 'Deep-dive architectural analysis, benchmarks, and enterprise operational strategies from the UniERP engineering and product teams.',
    date: 'August 2026',
    readTime: '6 min',
    author: { name: 'UniERP Editorial Team', role: 'Systems Architecture', avatar: 'UE' },
    content: [
      {
        heading: 'Architectural Overview & Implementation',
        body: 'Modern enterprises require composable business applications that eliminate data silos and scale across global multi-entity operations without latency or performance degradation.',
      },
      {
        heading: 'Best Practices & Production Deployment',
        body: 'Leveraging database-level row security, automated workflows, and high-throughput REST APIs ensures maximum compliance and operational velocity.',
      },
    ],
    relatedPosts: [
      { title: 'UniERP v3.8: Enhanced Manufacturing MRP', slug: 'v38-manufacturing-mrp-ai-forecasting', category: 'Product Update', date: 'July 22, 2026' },
      { title: 'The 8 Most Common ERP Implementation Mistakes', slug: 'erp-implementation-mistakes', category: 'Best Practice', date: 'July 18, 2026' },
    ],
  };

  return <BlogPostClient post={post} />;
}
