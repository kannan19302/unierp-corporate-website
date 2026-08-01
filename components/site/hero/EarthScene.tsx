'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Earth } from './Earth';
import { ModuleOrbit } from './ModuleOrbit';
import { HERO_MODULES, EARTH_RADIUS } from './heroConfig';

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.getAttribute('data-theme') === 'dark');
    update();
    const mo = new MutationObserver(update);
    mo.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

/** Slow auto-rotation + gentle pointer parallax for the whole system. */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.07;
    const targetX = state.pointer.y * 0.16;
    const targetY = state.pointer.x * 0.22;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.04;
    ref.current.rotation.z += (targetY - ref.current.rotation.z) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

/**
 * The hero centerpiece — a living solar system of ERP modules orbiting a
 * glowing data-earth, with pulsing connections between every node.
 */
export function EarthScene({
  moduleCount = 6,
  paused = false,
  onReady,
}: {
  moduleCount?: number;
  /** Halt the render loop while the hero is off-screen. */
  paused?: boolean;
  /** Fired after the first frame is on screen, so the poster can fade out. */
  onReady?: () => void;
}) {
  const dark = useDarkMode();
  const [active, setActive] = useState<string | null>(null);
  const modules = HERO_MODULES.slice(0, moduleCount);

  return (
    <Canvas
      // Capped at 1.5: beyond this the point cloud costs far more fill rate
      // than it gains in apparent sharpness.
      dpr={[1, 1.5]}
      frameloop={paused ? 'never' : 'always'}
      camera={{ position: [0, 0.4, 3.6], fov: 46 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      // Lets r3f drop resolution rather than frames on weak GPUs.
      performance={{ min: 0.5 }}
      onCreated={({ gl }) => {
        gl.setClearAlpha(0);
        onReady?.();
      }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#bfdbfe" />
      <pointLight position={[-3, -1, -2]} intensity={0.5} color="#a78bfa" />

      <Suspense fallback={null}>
        <Rig>
          <Earth dotCount={11000} />
          {modules.map((m) => (
            <ModuleOrbit
              key={m.id}
              module={m}
              active={active === m.id}
              onFocus={(id) => setActive(id)}
            />
          ))}
          <Stars
            radius={EARTH_RADIUS * 24}
            depth={EARTH_RADIUS * 22}
            count={dark ? 2600 : 900}
            factor={dark ? 4 : 2.4}
            saturation={0}
            fade
            speed={0.6}
          />
        </Rig>
      </Suspense>
    </Canvas>
  );
}
