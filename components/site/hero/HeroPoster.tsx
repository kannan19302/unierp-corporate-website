/**
 * Zero-JS stand-in for the WebGL hero.
 *
 * The three.js scene ships in its own chunk and needs a second or two to
 * compile, upload geometry and present its first frame. Rendering nothing
 * during that window left the hero visibly empty on first paint. This poster
 * is pure CSS, server-rendered, and approximates the scene's silhouette —
 * a glowing data-globe with an atmosphere halo and two orbit rings — so the
 * composition is complete from the very first frame.
 *
 * It is also the permanent fallback for reduced-motion users, small screens
 * and any client without WebGL.
 */
export function HeroPoster({ animated = true }: { animated?: boolean }) {
  return (
    <div className={`hero-poster${animated ? ' hero-poster--animated' : ''}`} aria-hidden>
      <div className="hero-poster__halo" />
      <div className="hero-poster__globe" />
      <div className="hero-poster__ring hero-poster__ring--a" />
      <div className="hero-poster__ring hero-poster__ring--b" />
    </div>
  );
}
