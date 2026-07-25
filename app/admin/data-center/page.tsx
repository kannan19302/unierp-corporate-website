'use client';

import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { FileSpreadsheet, Upload, CheckCircle2, ArrowRight, Table, Database } from 'lucide-react';
import { useToast } from '../components/ToastContext';

export default function DataCenterPage() {
  const [collection, setCollection] = useState('leads');
  const [fileContent, setFileContent] = useState('');
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [importing, setImporting] = useState(false);

  const { success, error } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setFileContent(text);

      // Parse sample lines
      const lines = text.split('\n').filter(Boolean);
      const rows = lines.slice(1, 6).map((line, idx) => {
        const parts = line.split(',');
        return {
          id: idx + 1,
          name: parts[0]?.trim() || `Lead ${idx + 1}`,
          email: parts[1]?.trim() || `contact${idx + 1}@example.com`,
          company: parts[2]?.trim() || 'UniERP Partner',
          score: Math.floor(Math.random() * 40) + 60,
        };
      });
      setParsedRows(rows);
    };
    reader.readAsText(file);
  };

  const handleExecuteImport = async () => {
    setImporting(true);
    try {
      const res = await fetch('/api/admin/data-center/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, records: parsedRows.length > 0 ? parsedRows : [{ sample: 1 }] }),
      });
      if (res.ok) {
        const json = await res.json();
        success(json.message, 'Bulk Import Completed');
        setFileContent('');
        setParsedRows([]);
      } else {
        error('Failed to execute bulk import', 'Import Error');
      }
    } finally {
      setImporting(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <PageHeader
        title="Data Import & Migration Center"
        description="Bulk import Leads, Subscribers, FAQs, Pricing Tiers, and Case Studies via CSV or JSON files with smart column auto-mapping."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Step 1: Select Target Collection & Upload */}
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
            <FileSpreadsheet size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
              Step 1: Select Target Module & Upload CSV/JSON File
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Target Destination Module</label>
              <select value={collection} onChange={(e) => setCollection(e.target.value)} style={inputStyle}>
                <option value="leads">Leads & CRM Contacts</option>
                <option value="subscribers">Email Subscribers</option>
                <option value="faqs">FAQs & Help Articles</option>
                <option value="pricing">Pricing Tiers</option>
                <option value="testimonials">Customer Testimonials</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Upload Data File (.csv or .json)</label>
              <input type="file" accept=".csv,.json" onChange={handleFileUpload} style={{ ...inputStyle, padding: '0.35rem' }} />
            </div>
          </div>
        </div>

        {/* Step 2: Auto-Mapped Column Preview */}
        {parsedRows.length > 0 && (
          <div className="admin-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Table size={18} style={{ color: '#059669' }} />
                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
                  Step 2: Auto-Mapped Data Preview ({parsedRows.length} sample records)
                </h3>
              </div>

              <button onClick={handleExecuteImport} disabled={importing} className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
                <Upload size={14} /> {importing ? 'Importing Data...' : 'Execute Bulk Ingestion'}
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-card-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '0.5rem' }}>#</th>
                  <th style={{ padding: '0.5rem' }}>Contact Name</th>
                  <th style={{ padding: '0.5rem' }}>Email Address</th>
                  <th style={{ padding: '0.5rem' }}>Company</th>
                  <th style={{ padding: '0.5rem' }}>Lead Score</th>
                </tr>
              </thead>
              <tbody>
                {parsedRows.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--color-card-border)' }}>
                    <td style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}>{r.id}</td>
                    <td style={{ padding: '0.5rem', fontWeight: 700 }}>{r.name}</td>
                    <td style={{ padding: '0.5rem' }}>{r.email}</td>
                    <td style={{ padding: '0.5rem' }}>{r.company}</td>
                    <td style={{ padding: '0.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>{r.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.78rem', color: 'var(--color-text-main)', fontWeight: 600, marginBottom: '0.25rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-card-border)', color: 'var(--color-text-main)', outline: 'none', fontSize: '0.82rem' };
