import { getIcon } from '@/lib/icon-registry';

export function DynamicIcon({ name, size = 20, className, color }: { name?: string | null; size?: number; className?: string; color?: string }) {
  const Icon = getIcon(name);
  return <Icon size={size} className={className} color={color} />;
}
