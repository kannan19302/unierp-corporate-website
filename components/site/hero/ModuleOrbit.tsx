'use client';

import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { EARTH_RADIUS, type HeroModule } from './heroConfig';

const ARC_SEGMENTS = 40;
const RING_SEGMENTS = 140;

let glowTexture: THREE.Texture | null = null;
function getGlowTexture(): THREE.Texture {
  if (glowTexture) return glowTexture;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  glowTexture = new THREE.CanvasTexture(c);
  return glowTexture;
}

interface ModuleOrbitProps {
  module: HeroModule;
  active: boolean;
  onFocus: (id: string | null) => void;
  /** seconds per data-pulse lap on the arc */
  pulseSpeed?: number;
}

/**
 * One ERP module "planet": a tilted orbit ring, a glowing node that travels
 * around it, a live data-arc to the globe and a pulse of data flowing along
 * the connection. Hover/activate reveals a holographic label chip.
 */
export function ModuleOrbit({ module, active, onFocus, pulseSpeed = 0.4 }: ModuleOrbitProps) {
  const tilted = useRef<THREE.Group>(null);
  const node = useRef<THREE.Group>(null);
  const arcAttr = useRef<THREE.BufferAttribute>(null);
  const pulse = useRef<THREE.Sprite>(null);
  const angle = useRef(module.phase);
  const pulseT = useRef(0);
  const [hover, setHover] = useState(false);

  const shown = active || hover;

  const ringPoints = useMemo(() => {
    const arr = new Float32Array(RING_SEGMENTS * 3);
    for (let i = 0; i < RING_SEGMENTS; i++) {
      const t = (i / RING_SEGMENTS) * Math.PI * 2;
      arr[i * 3] = module.radius * Math.cos(t);
      arr[i * 3 + 1] = 0;
      arr[i * 3 + 2] = module.radius * Math.sin(t);
    }
    return arr;
  }, [module.radius]);

  useFrame((_, delta) => {
    angle.current += module.speed * delta;
    const a = angle.current;
    if (node.current) {
      node.current.position.set(module.radius * Math.cos(a), 0, module.radius * Math.sin(a));
    }

    const wp = new THREE.Vector3();
    if (node.current) node.current.getWorldPosition(wp);

    const dir = wp.clone().normalize();
    const start = dir.clone().multiplyScalar(EARTH_RADIUS * 1.06);
    const mid = start.clone().add(wp).multiplyScalar(0.5).add(dir.clone().multiplyScalar(0.55));
    const curve = new THREE.QuadraticBezierCurve3(start, mid, wp);
    const pts = curve.getPoints(ARC_SEGMENTS);

    if (arcAttr.current) {
      for (let i = 0; i < ARC_SEGMENTS; i++) {
        arcAttr.current.setXYZ(i, pts[i].x, pts[i].y, pts[i].z);
      }
      arcAttr.current.needsUpdate = true;
    }
    if (pulse.current) {
      pulseT.current = (pulseT.current + delta * pulseSpeed) % 1;
      const p = curve.getPoint(pulseT.current);
      pulse.current.position.copy(p);
    }
  });

  return (
    <>
      <group ref={tilted} rotation={[module.inclination, 0, 0]}>
        {/* Orbit ring */}
        <lineLoop>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[ringPoints, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color={module.color}
            transparent
            opacity={shown ? 0.55 : 0.22}
            depthWrite={false}
          />
        </lineLoop>

        {/* Node + halo */}
        <group ref={node}>
          <mesh
            onPointerOver={(e) => {
              e.stopPropagation();
              setHover(true);
              onFocus(module.id);
            }}
            onPointerOut={() => {
              setHover(false);
              onFocus(null);
            }}
          >
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.05, 24, 24]} />
            <meshBasicMaterial color={module.color} />
          </mesh>
          <sprite scale={[0.34, 0.34, 1]} position={[0, 0, 0]}>
            <spriteMaterial
              map={getGlowTexture()}
              color={module.color}
              transparent
              opacity={shown ? 0.95 : 0.6}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>

          {/* Label chip */}
          <Html center distanceFactor={9} zIndexRange={[60, 0]} style={{ pointerEvents: 'none' }}>
            <div
              data-module-orbit
              style={{
                transform: 'translateY(-10px)',
                padding: '0.3rem 0.7rem',
                borderRadius: 9999,
                fontSize: '0.72rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                color: module.color,
                background: 'rgba(2,6,23,0.55)',
                border: `1px solid ${module.color}55`,
                backdropFilter: 'blur(8px)',
                transition: 'opacity 0.25s ease',
                opacity: shown ? 1 : 0.45,
              }}
            >
              {module.name}
            </div>
          </Html>
        </group>
      </group>

      {/* Data connection arc + travelling pulse (scene space) */}
      <line>
        <bufferGeometry>
          <bufferAttribute ref={arcAttr} attach="attributes-position" args={[new Float32Array(ARC_SEGMENTS * 3), 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={module.color} transparent opacity={shown ? 0.75 : 0.3} depthWrite={false} />
      </line>
      <sprite ref={pulse} scale={[0.07, 0.07, 1]}>
        <spriteMaterial
          map={getGlowTexture()}
          color="#ffffff"
          transparent
          opacity={shown ? 1 : 0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </>
  );
}
