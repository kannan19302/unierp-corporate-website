import type { SiteContent } from '@/lib/cms/queries';

export function ThemeVars({ settings }: { settings: SiteContent['settings'] }) {
  const overrides: string[] = [];
  if (settings.themePrimary) overrides.push(`--color-primary: ${settings.themePrimary};`);
  if (settings.themeAccent) overrides.push(`--color-accent: ${settings.themeAccent};`);
  if (settings.themeEmerald) overrides.push(`--color-emerald: ${settings.themeEmerald};`);
  if (settings.themePurple) overrides.push(`--color-purple: ${settings.themePurple};`);

  if (overrides.length === 0) return null;

  return <style dangerouslySetInnerHTML={{ __html: `:root, [data-theme] { ${overrides.join(' ')} }` }} />;
}
