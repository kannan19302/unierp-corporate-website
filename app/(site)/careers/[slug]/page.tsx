import { notFound } from 'next/navigation';
import { CareerDetailClient } from './CareerDetailClient';

const JOBS_DATA: Record<string, any> = {
  'senior-staff-systems-engineer': {
    slug: 'senior-staff-systems-engineer',
    title: 'Senior Staff Systems Engineer (Core Distributed Engine)',
    department: 'Engineering',
    location: 'Bengaluru, India / Remote',
    type: 'Full-time',
    experience: '6+ Years',
    salary: '₹42,00,000 - ₹65,00,000 + Equity',
    overview: 'We are looking for a world-class backend and distributed systems engineer to lead the development of our high-throughput transactional ledger, PostgreSQL Row-Level Security isolation primitives, and multi-region state replication engines.',
    responsibilities: [
      'Architect sub-millisecond database queries across multi-tenant PostgreSQL clusters with 2,500+ active enterprise tenants.',
      'Design idempotent webhook dispatch pipelines handling 10,000+ events per second with zero message loss.',
      'Optimize NestJS and TypeScript microservices for memory efficiency, low latency, and zero-downtime rolling upgrades.',
      'Mentor senior engineers and drive rigorous architectural RFC reviews.',
    ],
    requirements: [
      'Deep expertise in PostgreSQL internals, indexing strategies, RLS, and connection pooling (PgBouncer).',
      'Proficiency in TypeScript, Node.js / NestJS, Redis, and distributed systems consensus patterns.',
      'Track record of building and scaling mission-critical B2B SaaS or fintech platforms.',
      'Passion for developer ergonomics, clean code, and comprehensive automated testing.',
    ],
    benefits: [
      'Comprehensive Health & Dental Insurance (100% covered)',
      'Generous Stock Options (ESOP) Pool',
      'Remote-First Setup Stipend ($1,500 for home office)',
      'Annual Learning & Conference Budget (₹1,50,000)',
      'Flexible Unlimited Paid Time Off (PTO)',
    ],
  },
  'principal-solutions-architect': {
    slug: 'principal-solutions-architect',
    title: 'Principal Enterprise Solutions Architect',
    department: 'Solutions',
    location: 'Mumbai, India / Hybrid',
    type: 'Full-time',
    experience: '8+ Years',
    salary: '₹38,00,000 - ₹55,00,000 + Performance Bonus',
    overview: 'Partner with enterprise CFOs, CIOs, and IT directors across Manufacturing, Retail, and Healthcare verticals to design migration blueprints from legacy ERPs to UniERP.',
    responsibilities: [
      'Lead technical discovery sessions and author migration architectures for Fortune 500 prospects.',
      'Design custom REST API integration pipelines connecting UniERP with SAP, Salesforce, and legacy databases.',
      'Act as the trusted technical advisor during enterprise POCs and executive RFP presentations.',
      'Collaborate with Product Engineering to translate enterprise customer feedback into core roadmap features.',
    ],
    requirements: [
      'Extensive experience designing enterprise ERP solutions (SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics, or Odoo).',
      'Strong knowledge of financial workflows, general ledger mapping, supply chain logistics, and manufacturing BOMs.',
      'Exceptional presentation, storytelling, and executive stakeholder communication skills.',
    ],
    benefits: [
      'Executive Bonus Plan & Stock Options',
      'Comprehensive Medical & Wellness Coverage',
      'Travel & Client Hospitality Expense Account',
      'Leadership Fast-Track Program',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(JOBS_DATA).map((slug) => ({ slug }));
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = JOBS_DATA[slug] || {
    slug,
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    department: 'Engineering',
    location: 'Remote / India',
    type: 'Full-time',
    experience: '4+ Years',
    salary: 'Competitive + Equity',
    overview: 'Join the engineering and product team building the future of composable enterprise ERP software for modern businesses.',
    responsibilities: [
      'Build scalable, highly reliable modular applications for modern enterprise operations.',
      'Collaborate closely with design, engineering, and customer success teams.',
      'Drive high software craftsmanship and automated testing standards.',
    ],
    requirements: [
      'Strong problem-solving skills and experience with modern web technologies.',
      'Track record of delivering production-grade SaaS features.',
    ],
    benefits: [
      'Comprehensive Health Insurance',
      'Equity & Performance Incentives',
      'Remote Work Flexibility',
      'Continuous Learning Stipend',
    ],
  };

  return <CareerDetailClient job={job} />;
}
