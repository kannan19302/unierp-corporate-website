'use client';

import { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { getSessionId } from '@/lib/useAnalytics';
import { useSiteContent } from './SiteContentProvider';

type Message = { sender: 'ai' | 'user' | 'system'; text: string; showEscalate?: boolean };

export function ChatWidget() {
  const { settings } = useSiteContent();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{ sender: 'ai', text: settings.chatGreeting }]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [escalating, setEscalating] = useState(false);
  const [escalateName, setEscalateName] = useState('');
  const [escalateEmail, setEscalateEmail] = useState('');
  const [ticketId, setTicketId] = useState<string | null>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const text = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text }]);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: getSessionId(), query: text }),
      });
      const data = await res.json();
      setConversationId(data.conversationId || null);
      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply, showEscalate: data.escalateOption }]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'ai', text: settings.chatFallbackMessage, showEscalate: true }]);
    }
  };

  const submitEscalation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conversationId || !escalateName || !escalateEmail) return;
    try {
      const res = await fetch('/api/ai-chat/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, name: escalateName, email: escalateEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setTicketId(data.ticketId);
        setEscalating(false);
        setMessages((prev) => [
          ...prev,
          { sender: 'system', text: `Support ticket ${data.ticketId} created! Our team will reach out to ${escalateEmail} shortly.` },
        ]);
      }
    } catch {
      setMessages((prev) => [...prev, { sender: 'system', text: 'Could not create a ticket right now — please try again.' }]);
    }
  };

  if (!settings.chatEnabled) return null;

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 90 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          aria-label={settings.chatLauncherLabel || 'Ask AI Assistant'}
          title={settings.chatLauncherLabel || 'Ask AI Assistant'}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb, #7e22ce)',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <Bot size={26} />
        </button>
      ) : (
        <div className="glass-panel" style={{ width: '360px', height: '480px', display: 'flex', flexDirection: 'column', background: 'var(--header-bg)', border: '1px solid var(--color-primary)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)' }}>
          <div style={{ padding: '0.85rem 1.15rem', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', borderTopLeftRadius: '18px', borderTopRightRadius: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
              <Bot size={18} />
              <span>{settings.chatTitle}</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                <div
                  style={{
                    padding: '0.65rem 0.95rem',
                    borderRadius: '12px',
                    background: msg.sender === 'user' ? '#2563eb' : msg.sender === 'system' ? 'rgba(16, 185, 129, 0.15)' : 'var(--color-surface)',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--color-text-main)',
                    border: msg.sender === 'system' ? '1px solid #10b981' : 'none',
                  }}
                >
                  {msg.text}
                </div>
                {msg.showEscalate && !ticketId && !escalating && (
                  <button
                    onClick={() => setEscalating(true)}
                    style={{ marginTop: '0.4rem', background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', border: '1px solid #ec4899', borderRadius: '6px', padding: '0.35rem 0.65rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Escalate to Human Specialist
                  </button>
                )}
              </div>
            ))}

            {escalating && !ticketId && (
              <form onSubmit={submitEscalation} className="glass-panel" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                  required
                  placeholder="Your name"
                  value={escalateName}
                  onChange={(e) => setEscalateName(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.8rem' }}
                />
                <input
                  required
                  type="email"
                  placeholder="Your work email"
                  value={escalateEmail}
                  onChange={(e) => setEscalateEmail(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.8rem' }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0.5rem', fontSize: '0.8rem', justifyContent: 'center' }}>
                  Create Ticket
                </button>
              </form>
            )}
          </div>

          <form onSubmit={sendMessage} style={{ padding: '0.75rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.4rem' }}>
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'var(--color-surface)', border: '1px solid var(--glass-border)', color: 'var(--color-text-main)', outline: 'none', fontSize: '0.85rem' }}
            />
            <button type="submit" style={{ background: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0.5rem 0.75rem', cursor: 'pointer' }}>
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
