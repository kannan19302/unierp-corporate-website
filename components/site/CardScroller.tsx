'use client';

/**
 * Responsive card layout: a normal CSS grid on desktop, and a horizontal
 * snap-scroll strip on mobile (<=720px). Reuses the `.card-scroller` utility
 * defined in app/globals.css so the same pattern can be dropped in anywhere
 * a row of cards needs to become swipeable on small screens.
 */
export function CardScroller({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`card-scroller ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
