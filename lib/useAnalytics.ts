'use client';

import { useEffect } from 'react';

function getSessionId(): string {
  let id = localStorage.getItem('unierp-session-id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('unierp-session-id', id);
  }
  return id;
}

export function useAnalytics(path: string) {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path,
          referrer: document.referrer || undefined,
          sessionId: getSessionId(),
          eventType: 'pageview',
          utmSource: params.get('utm_source') || undefined,
          utmMedium: params.get('utm_medium') || undefined,
          utmCampaign: params.get('utm_campaign') || undefined,
        }),
      }).catch(() => {});
    } catch {
      // analytics must never break the page
    }
  }, [path]);
}

export { getSessionId };
