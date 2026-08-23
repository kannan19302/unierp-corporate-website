import { notFound } from 'next/navigation';
import { CompareClient } from './CompareClient';

const COMPARISON_MAP: Record<string, any> = {
  'vs-sap': {
    competitor: 'vs-sap',
    competitorName: 'SAP S/4HANA',
    headline: 'Modern Composable Agility without the Multi-Million Dollar Implementation Lock-In',
    subheadline: 'UniERP delivers enterprise-grade multi-entity finance, supply chain, and MRP at 1/8th the implementation cost of legacy SAP.',
    keyTakeaway: 'Deploy in weeks instead of 18 months, with modern TypeScript and PostgreSQL architecture.',
    tco3Year: { unierp: '₹36 Lakhs ($42K)', competitor: '₹2.8 Crores ($330K)', savings: '87% Cost Reduction' },
    migrationTimeline: '2 to 4 Weeks',
    features: [
      {
        category: 'Licensing & Total Cost',
        items: [
          { name: 'Pricing Transparency', unierp: 'All-inclusive per-user pricing', competitor: 'Opaque named user + engine metrics', note: 'No surprise annual true-up fees' },
          { name: '30-Day Free Trial', unierp: true, competitor: false },
          { name: 'Customization Cost', unierp: 'Low-code visual workflows', competitor: 'Expensive ABAP consultants ($200/hr)' },
        ],
      },
      {
        category: 'Architecture & Scalability',
        items: [
          { name: 'Database Multi-Tenancy', unierp: 'PostgreSQL Row-Level Security', competitor: 'Monolithic SAP HANA Cluster' },
          { name: 'Deployment Options', unierp: 'Cloud SaaS / Dedicated VPC / Hybrid', competitor: 'Complex Cloud / On-Premise' },
          { name: 'Modern REST & Webhook APIs', unierp: true, competitor: 'Legacy RFC / SOAP interfaces' },
        ],
      },
      {
        category: 'User Experience & Operations',
        items: [
          { name: 'Consumer-Grade UI / UX', unierp: true, competitor: 'Complex SAP GUI / Fiori overhead' },
          { name: 'Offline-First POS & Scanner Apps', unierp: true, competitor: false },
          { name: 'Automated 1-Click Month-End Close', unierp: true, competitor: 'Multi-day batch cycles' },
        ],
      },
    ],
  },
  'vs-netsuite': {
    competitor: 'vs-netsuite',
    competitorName: 'Oracle NetSuite',
    headline: 'The Developer-Friendly, Multi-Tenant Alternative to Oracle NetSuite',
    subheadline: 'Eliminate steep contract renewal price hikes and slow SuiteScript customizations with UniERP high-speed modular platform.',
    keyTakeaway: 'Transparent predictable pricing, sub-millisecond API response times, and full database exportability.',
    tco3Year: { unierp: '₹36 Lakhs ($42K)', competitor: '₹1.6 Crores ($190K)', savings: '77% Cost Reduction' },
    migrationTimeline: '10 to 14 Days',
    features: [
      {
        category: 'Licensing & Contracts',
        items: [
          { name: 'Predictable Renewal Terms', unierp: 'No annual price lock-in spikes', competitor: 'Frequent 20-40% renewal hikes' },
          { name: '30-Day Free Trial', unierp: true, competitor: false },
          { name: 'Export Complete Database Dump', unierp: true, competitor: 'Restricted CSV only' },
        ],
      },
      {
        category: 'Customization & Developer Ergonomics',
        items: [
          { name: 'Visual Workflow Builder', unierp: true, competitor: 'SuiteFlow with limited logic' },
          { name: 'Modern TypeScript / REST API', unierp: true, competitor: 'Legacy SuiteScript 2.1' },
          { name: 'Real-Time Webhook Concurrency', unierp: '10,000+ events/sec', competitor: 'Strict SuiteCloud concurrency limits' },
        ],
      },
    ],
  },
  'vs-odoo': {
    competitor: 'vs-odoo',
    competitorName: 'Odoo Enterprise',
    headline: 'Enterprise Security, PostgreSQL RLS, and Scalable Multi-Tenancy',
    subheadline: 'While Odoo struggles with complex enterprise multi-entity permissions and upgrade breakages, UniERP delivers bulletproof isolation.',
    keyTakeaway: 'Enterprise compliance (SOC 2, ISO 27001) and seamless zero-downtime upgrades.',
    tco3Year: { unierp: '₹36 Lakhs ($42K)', competitor: '₹65 Lakhs ($75K)', savings: '45% Cost Reduction' },
    migrationTimeline: '5 to 7 Days',
    features: [
      {
        category: 'Security & Enterprise Architecture',
        items: [
          { name: 'Cryptographic PostgreSQL RLS', unierp: true, competitor: 'Application-layer filtering only' },
          { name: 'Immutable Audit Log Engine', unierp: true, competitor: false },
          { name: 'Zero-Downtime Schema Upgrades', unierp: true, competitor: 'Frequent breaking major upgrades' },
        ],
      },
      {
        category: 'Core Manufacturing & Modules',
        items: [
          { name: 'Predictive ML Demand Forecasting', unierp: true, competitor: 'Basic min/max reorder points' },
          { name: 'Offline-First POS with SQLite Sync', unierp: true, competitor: 'Limited browser cache' },
        ],
      },
    ],
  },
  'vs-tally': {
    competitor: 'vs-tally',
    competitorName: 'Tally Prime',
    headline: 'Upgrade from Desktop Accounting to Complete Cloud Enterprise ERP',
    subheadline: 'Move beyond single-computer accounting to a unified platform connecting Sales, Inventory, Manufacturing, HR, and Multi-Branch Operations.',
    keyTakeaway: 'Anywhere cloud access, automated bank reconciliation, and real-time inventory visibility.',
    tco3Year: { unierp: '₹18 Lakhs ($21K)', competitor: '₹28 Lakhs (Software + Manual Labor)', savings: '60% Labor & Error Savings' },
    migrationTimeline: '24 to 48 Hours',
    features: [
      {
        category: 'Cloud vs Desktop',
        items: [
          { name: '100% Cloud Anywhere Access', unierp: true, competitor: 'Desktop Windows only' },
          { name: 'Multi-User Concurrent Edits', unierp: true, competitor: 'Frequent data corruption locks' },
          { name: 'Automated 1-Click Tally XML Import', unierp: true, competitor: 'Manual export' },
        ],
      },
      {
        category: 'Beyond Accounting',
        items: [
          { name: 'Advanced MRP II & Shopfloor Telemetry', unierp: true, competitor: false },
          { name: 'Integrated CRM & Lead Scoring', unierp: true, competitor: false },
          { name: 'Automated E-Invoicing & E-Way Bill', unierp: true, competitor: 'Manual third-party utility' },
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(COMPARISON_MAP).map((competitor) => ({ competitor }));
}

export default async function ComparePage({ params }: { params: Promise<{ competitor: string }> }) {
  const { competitor } = await params;
  const data = COMPARISON_MAP[competitor];
  if (!data) notFound();

  return <CompareClient data={data} />;
}
