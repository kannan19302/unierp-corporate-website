import { requireTenant } from '@/lib/tenant';
import { getSiteContent } from '@/lib/cms/queries';
import { SiteContentProvider } from '@/components/site/SiteContentProvider';
import { ThemeVars } from '@/components/site/ThemeVars';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { ChatWidget } from '@/components/site/ChatWidget';
import { AnimatedBackground } from '@/components/site/AnimatedBackground';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const tenant = await requireTenant();
  const content = await getSiteContent(tenant.id);

  return (
    <SiteContentProvider value={content}>
      <ThemeVars settings={content.settings} />

      <div className="animated-bg-glow glow-blue" style={{ position: 'fixed', top: '-120px', left: '5%' }} />
      <div className="animated-bg-glow glow-purple" style={{ position: 'fixed', top: '30%', right: '0%' }} />
      <div className="animated-bg-glow glow-emerald" style={{ position: 'fixed', bottom: '-10%', left: '0%' }} />
      <AnimatedBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </div>
    </SiteContentProvider>
  );
}
