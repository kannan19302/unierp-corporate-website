'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string, title?: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
  success: () => {},
  error: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((type: ToastType, message: string, title?: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const success = useCallback((message: string, title?: string) => showToast('success', message, title), [showToast]);
  const error = useCallback((message: string, title?: string) => showToast('error', message, title), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error }}>
      {children}
      {/* Floating Toast Container */}
      <div
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          right: '1.25rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          maxWidth: '380px',
          width: 'calc(100vw - 2.5rem)',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';
  const isWarning = toast.type === 'warning';

  const icon = isSuccess ? (
    <CheckCircle2 size={18} color="#059669" />
  ) : isError ? (
    <XCircle size={18} color="#ef4444" />
  ) : isWarning ? (
    <AlertCircle size={18} color="#d97706" />
  ) : (
    <Info size={18} color="var(--color-primary)" />
  );

  const borderColor = isSuccess ? '#059669' : isError ? '#ef4444' : isWarning ? '#d97706' : 'var(--color-primary)';
  const bgColor = isSuccess
    ? 'rgba(5, 150, 105, 0.1)'
    : isError
    ? 'rgba(239, 68, 68, 0.1)'
    : isWarning
    ? 'rgba(217, 119, 6, 0.1)'
    : 'rgba(37, 99, 235, 0.1)';

  return (
    <div
      style={{
        pointerEvents: 'auto',
        background: 'var(--color-card)',
        borderLeft: `4px solid ${borderColor}`,
        borderTop: '1px solid var(--color-card-border)',
        borderRight: '1px solid var(--color-card-border)',
        borderBottom: '1px solid var(--color-card-border)',
        borderRadius: '10px',
        padding: '0.75rem 1rem',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        backdropFilter: 'blur(12px)',
        animation: 'toastSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ marginTop: '0.1rem', flexShrink: 0, padding: '0.2rem', borderRadius: '6px', background: bgColor }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {toast.title && (
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.15rem' }}>
            {toast.title}
          </div>
        )}
        <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-main)', lineHeight: 1.4 }}>
          {toast.message}
        </div>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-text-subtle)',
          cursor: 'pointer',
          padding: '0.1rem',
          display: 'flex',
        }}
      >
        <X size={14} />
      </button>

      <style>{`
        @keyframes toastSlideIn {
          from { transform: translateX(40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
