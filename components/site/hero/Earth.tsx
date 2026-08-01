'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { EARTH_RADIUS, generateEarthPoints } from './heroConfig';

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragment = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
    gl_FragColor = vec4(0.28, 0.62, 1.0, 1.0) * intensity * 1.35;
  }
`;

/**
 * The hero centerpiece — a "digital Earth": dark ocean core, neon dot
 * continents, faint wireframe grid and a fresnel atmosphere halo.
 */
export function Earth({ dotCount = 11000 }: { dotCount?: number }) {
  const positions = useMemo(() => generateEarthPoints(EARTH_RADIUS, dotCount), [dotCount]);
  const gridOpacity = 0.05;

  return (
    <group>
      {/* Ocean core */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial color="#0a1c33" roughness={0.72} metalness={0.15} transparent opacity={0.96} />
      </mesh>

      {/* Faint latitude/longitude grid */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS * 1.002, 48, 48]} />
        <meshBasicMaterial wireframe color="#38bdf8" transparent opacity={gridOpacity} depthWrite={false} />
      </mesh>

      {/* Neon continent dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.032} sizeAttenuation color="#67e8f9" transparent opacity={0.95} depthWrite={false} />
      </points>

      {/* Atmosphere halo */}
      <mesh scale={EARTH_RADIUS * 1.24}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
