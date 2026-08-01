'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { CONSTELLATIONS, FLIGHT_DEPTH, type Constellation } from './constellations';
import { advanceEased, scrollState, startScrollTracking } from '@/lib/scrollSignal';

/* ── Depth-parallaxed starfield shell ────────────────────────────────── */
/**
 * One shell of stars at a fixed depth band. Several shells at different
 * depths are what produce parallax as the camera flies: near stars sweep past
 * quickly, distant ones barely move.
 */
function StarShell({
  count,
  near,
  far,
  size,
  opacity,
}: {
  count: number;
  near: number;
  far: number;
  size: number;
  opacity: number;
}) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 44;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = -(near + Math.random() * (far - near));
    }
    return arr;
  }, [count, near, far]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        color="#9fd8ff"
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── A single constellation that ignites as the camera passes it ─────── */
function ConstellationFigure({ data }: { data: Constellation }) {
  const nodesRef = useRef<THREE.Points>(null);
  const linksRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { nodePositions, linkPositions } = useMemo(() => {
    const nodes = new Float32Array(data.points.length * 3);
    data.points.forEach((p, i) => {
      nodes[i * 3] = p[0];
      nodes[i * 3 + 1] = p[1];
      nodes[i * 3 + 2] = p[2];
    });
    const links: number[] = [];
    for (const [a, b] of data.links) {
      links.push(...data.points[a], ...data.points[b]);
    }
    return { nodePositions: nodes, linkPositions: new Float32Array(links) };
  }, [data]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    // Ignition is a function of how close the camera is to this constellation's
    // depth — full brightness as it passes, falling off smoothly either side.
    const distance = Math.abs(state.camera.position.z - data.z);
    const ignition = THREE.MathUtils.clamp(1 - distance / 16, 0, 1);
    const eased = ignition * ignition * (3 - 2 * ignition);

    const nodeMat = nodesRef.current?.material as THREE.PointsMaterial | undefined;
    const linkMat = linksRef.current?.material as THREE.LineBasicMaterial | undefined;
    if (nodeMat) nodeMat.opacity = 0.18 + eased * 0.8;
    if (linkMat) linkMat.opacity = 0.04 + eased * 0.5;

    // A slow tumble keeps the figures from looking like flat decals.
    const t = state.clock.elapsedTime;
    group.rotation.y = Math.sin(t * 0.08 + data.z) * 0.16;
    group.rotation.x = Math.cos(t * 0.06 + data.z) * 0.1;
    group.scale.setScalar(1 + eased * 0.06);
  });

  return (
    <group ref={groupRef} position={[data.offset[0], data.offset[1], data.z]}>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          sizeAttenuation
          color={data.color}
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linksRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linkPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={data.color}
          transparent
          opacity={0.05}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

/* ── Scroll-driven camera flight ─────────────────────────────────────── */
/**
 * Maps document scroll onto a forward flight through the constellation field.
 * Reads the shared scroll signal directly rather than React state so the whole
 * tree is never re-rendered mid-scroll.
 */
function CameraFlight() {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => startScrollTracking(), []);

  useFrame((state, delta) => {
    const p = advanceEased(delta, 3.2);

    camera.position.z = 6 - p * FLIGHT_DEPTH;

    // A gentle drift keeps the flight from feeling like it is on rails.
    const t = state.clock.elapsedTime;
    const driftX = Math.sin(t * 0.07) * 0.5;
    const driftY = Math.cos(t * 0.05) * 0.35;

    // Pointer parallax, damped, layered on top of the drift.
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04;

    camera.position.x = driftX + pointer.current.x * 1.1;
    camera.position.y = driftY + pointer.current.y * 0.8;

    // Aim first — lookAt() rewrites the whole rotation, so the bank has to be
    // applied afterwards or it would be discarded every frame.
    camera.lookAt(0, 0, camera.position.z - 10);
    const bank = Math.sin(t * 0.04) * 0.03 + THREE.MathUtils.clamp(scrollState.velocity * 0.0004, -0.05, 0.05);
    camera.rotateZ(bank);
  });

  return null;
}

/* ── Recycling star shells ───────────────────────────────────────────── */
/**
 * The camera travels ~96 units but the star shells are only ~40 deep, so each
 * shell is repositioned to stay centred on the camera. This gives an endless
 * field for a fraction of the geometry.
 */
function TravellingStars({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.position.z = state.camera.position.z - 20;
  });
  return <group ref={ref}>{children}</group>;
}

export function UniverseGL() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.5 }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden
    >
      <CameraFlight />

      <TravellingStars>
        {/* Three depth bands — the spread between them is what reads as parallax. */}
        <StarShell count={isMobile ? 160 : 420} near={2} far={16} size={0.16} opacity={0.9} />
        <StarShell count={isMobile ? 200 : 520} near={16} far={30} size={0.11} opacity={0.65} />
        <StarShell count={isMobile ? 160 : 460} near={30} far={44} size={0.07} opacity={0.4} />
      </TravellingStars>

      {CONSTELLATIONS.map((c) => (
        <ConstellationFigure key={c.id} data={c} />
      ))}
    </Canvas>
  );
}
