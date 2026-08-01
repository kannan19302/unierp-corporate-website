import { requireTenant } from '@/lib/tenant';
import { getSiteContent } from '@/lib/cms/queries';
import { SiteContentProvider } from '@/components/site/SiteContentProvider';
import { ThemeVars } from '@/components/site/ThemeVars';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { ChatWidget } from '@/components/site/ChatWidget';
import { SmoothScroll } from '@/components/site/anim/SmoothScroll';
import { ScrollProgress } from '@/components/site/anim/ScrollProgress';
import { RevealObserver } from '@/components/site/anim/RevealObserver';
import { UniverseBackground } from '@/components/site/universe/UniverseBackground';
import { MotionConfig } from 'framer-motion';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const tenant = await requireTenant();
  const content = await getSiteContent(tenant.id);

  return (
    <SiteContentProvider value={content}>
      <ThemeVars settings={content.settings} />

      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <div className="animated-bg-glow glow-blue" style={{ position: 'fixed', top: '-120px', left: '5%' }} />
          <div className="animated-bg-glow glow-purple" style={{ position: 'fixed', top: '30%', right: '0%' }} />
          <div className="animated-bg-glow glow-emerald" style={{ position: 'fixed', bottom: '-10%', left: '0%' }} />

          {/* Ambient universe backdrop */}
          <UniverseBackground />
          <div className="cosmic-aurora cosmic-aurora--conic" style={{ position: 'fixed', inset: 0, zIndex: 0 }} aria-hidden />

          <ScrollProgress />
          <RevealObserver />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <Header />
            <main>{children}</main>
            <Footer />
            <ChatWidget />
          </div>
        </SmoothScroll>
      </MotionConfig>
    </SiteContentProvider>
  );
}
