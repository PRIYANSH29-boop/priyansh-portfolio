"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Sphere,
  Icosahedron,
  MeshDistortMaterial,
  Environment,
  Points,
  PointMaterial,
  Html,
  Trail,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function CoreOrb() {
  const ref = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * 0.18;
      ref.current.rotation.y = t * 0.22;
    }
    if (inner.current) {
      inner.current.rotation.x = -t * 0.3;
      inner.current.rotation.z = t * 0.25;
    }
  });

  return (
    <group>
      {/* outer wire icosahedron */}
      <Icosahedron args={[1.55, 1]} ref={ref}>
        <meshBasicMaterial
          color="#5b8cff"
          wireframe
          transparent
          opacity={0.45}
        />
      </Icosahedron>

      {/* inner distorted sphere */}
      <Sphere args={[1.05, 64, 64]} ref={inner}>
        <MeshDistortMaterial
          color="#1e3a8a"
          emissive="#3d7bff"
          emissiveIntensity={0.55}
          roughness={0.15}
          metalness={0.6}
          distort={0.42}
          speed={1.6}
        />
      </Sphere>

      {/* halo ring */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[1.95, 2.0, 128]} />
        <meshBasicMaterial color="#7ba6ff" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, Math.PI / 3]}>
        <ringGeometry args={[2.25, 2.27, 128]} />
        <meshBasicMaterial color="#5b8cff" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>

      {/* point light glow */}
      <pointLight color="#5b8cff" intensity={3} distance={6} />
    </group>
  );
}

function OrbitingNode({
  radius,
  speed,
  offset,
  color,
  size = 0.06,
  yTilt = 0,
}: {
  radius: number;
  speed: number;
  offset: number;
  color: string;
  size?: number;
  yTilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.6) * 0.5 + yTilt,
      Math.sin(t) * radius
    );
  });
  return (
    <Trail width={1.6} length={4} color={color} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

function ParticleField() {
  const positions = useMemo(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a8c0ff"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

function HoloPanel({
  position,
  rotation,
  children,
  width = 1.6,
  height = 1.0,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  children: React.ReactNode;
  width?: number;
  height?: number;
}) {
  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
      <group position={position} rotation={rotation}>
        {/* glass panel */}
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshPhysicalMaterial
            color="#0a0a0d"
            metalness={0.4}
            roughness={0.2}
            transmission={0.55}
            thickness={0.3}
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* edge glow */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[width + 0.04, height + 0.04]} />
          <meshBasicMaterial color="#5b8cff" transparent opacity={0.18} side={THREE.DoubleSide} />
        </mesh>
        <Html
          transform
          occlude={false}
          distanceFactor={1.6}
          position={[0, 0, 0.02]}
          style={{ pointerEvents: "none" }}
        >
          {children}
        </Html>
      </group>
    </Float>
  );
}

function MouseParallax() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });
  useFrame(() => {
    camera.position.x += (target.current.x - camera.position.x) * 0.04;
    camera.position.y += (target.current.y - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  // attach handlers
  useMemo(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.current.x = nx * 0.5;
      target.current.y = -ny * 0.3;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <MouseParallax />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#7ba6ff" />
        <pointLight position={[-3, -2, -2]} intensity={1.2} color="#3d7bff" />

        <ParticleField />

        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
          <CoreOrb />
        </Float>

        {/* Orbiting nodes */}
        <OrbitingNode radius={2.4} speed={0.6} offset={0} color="#7ba6ff" />
        <OrbitingNode radius={2.7} speed={0.4} offset={Math.PI / 1.5} color="#3effc4" size={0.05} yTilt={0.4} />
        <OrbitingNode radius={2.2} speed={0.5} offset={Math.PI} color="#5b8cff" size={0.07} yTilt={-0.3} />

        {/* Holographic panels */}
        <HoloPanel position={[-2.6, 1.6, -0.5]} rotation={[0.05, 0.4, 0.04]} width={1.8} height={1.05}>
          <PanelStock />
        </HoloPanel>

        <HoloPanel position={[2.7, 1.3, -0.7]} rotation={[0.0, -0.4, -0.04]} width={1.9} height={1.0}>
          <PanelFraudHeatmap />
        </HoloPanel>

        <HoloPanel position={[-2.4, -1.6, -0.4]} rotation={[-0.05, 0.45, 0.0]} width={1.7} height={0.85}>
          <PanelNeural />
        </HoloPanel>

        <HoloPanel position={[2.5, -1.7, -0.6]} rotation={[-0.05, -0.42, 0.0]} width={1.6} height={0.78}>
          <PanelMetrics />
        </HoloPanel>

        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}

/* ============ Holographic panel contents (HTML embedded in 3D) ============ */

function PanelStock() {
  return (
    <div className="w-[280px] rounded-xl border border-accent/30 bg-ink-900/70 backdrop-blur-xl p-3 text-[10px] text-ink-100 font-mono">
      <div className="flex items-center justify-between mb-2">
        <span className="text-accent-soft tracking-widest">NVDA · LIVE</span>
        <span className="text-signal-green">+4.82%</span>
      </div>
      <svg viewBox="0 0 200 60" className="w-full h-12">
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#5b8cff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,45 L20,40 L40,42 L60,30 L80,32 L100,22 L120,26 L140,14 L160,18 L180,8 L200,12 L200,60 L0,60 Z"
          fill="url(#g1)"
        />
        <path
          d="M0,45 L20,40 L40,42 L60,30 L80,32 L100,22 L120,26 L140,14 L160,18 L180,8 L200,12"
          fill="none"
          stroke="#7ba6ff"
          strokeWidth="1.2"
        />
      </svg>
      <div className="grid grid-cols-3 gap-2 mt-2 text-[8px] text-ink-200">
        <div>RSI 68</div>
        <div>VOL 42M</div>
        <div className="text-accent-soft">FORECAST ↑</div>
      </div>
    </div>
  );
}

function PanelFraudHeatmap() {
  return (
    <div className="w-[300px] rounded-xl border border-accent/30 bg-ink-900/70 backdrop-blur-xl p-3 text-[10px] font-mono">
      <div className="flex items-center justify-between mb-2 text-ink-200">
        <span className="text-accent-soft tracking-widest">FRAUD · HEATMAP</span>
        <span className="text-signal-red">3 anomalies</span>
      </div>
      <div className="grid grid-cols-12 gap-[2px]">
        {Array.from({ length: 48 }).map((_, i) => {
          const v = Math.random();
          const isHot = v > 0.85;
          return (
            <div
              key={i}
              className="aspect-square rounded-[2px]"
              style={{
                background: isHot
                  ? `rgba(255,77,109,${0.55 + v * 0.4})`
                  : `rgba(91,140,255,${0.06 + v * 0.25})`,
              }}
            />
          );
        })}
      </div>
      <div className="mt-2 text-[8px] text-ink-200 tracking-wider">
        TXN 12,840 / s · AUC 0.987
      </div>
    </div>
  );
}

function PanelNeural() {
  return (
    <div className="w-[250px] rounded-xl border border-accent/30 bg-ink-900/70 backdrop-blur-xl p-3 text-[9px] font-mono">
      <div className="text-accent-soft tracking-widest mb-2">NEURAL · LAYER 7</div>
      <svg viewBox="0 0 240 80" className="w-full h-14">
        {[0, 1, 2, 3].map((col) => {
          const xs = col * 70 + 20;
          return [0, 1, 2, 3].map((row) => {
            const ys = row * 18 + 12;
            return (
              <circle
                key={`${col}-${row}`}
                cx={xs}
                cy={ys}
                r="2.4"
                fill="#7ba6ff"
                opacity={0.7}
              />
            );
          });
        })}
        {/* lines */}
        {[0, 1, 2].map((col) =>
          [0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((row2) => (
              <line
                key={`${col}-${row}-${row2}`}
                x1={col * 70 + 20}
                y1={row * 18 + 12}
                x2={(col + 1) * 70 + 20}
                y2={row2 * 18 + 12}
                stroke="#5b8cff"
                strokeOpacity="0.12"
                strokeWidth="0.5"
              />
            ))
          )
        )}
      </svg>
      <div className="text-[8px] text-ink-200 mt-1">loss 0.0142 · acc 99.3%</div>
    </div>
  );
}

function PanelMetrics() {
  return (
    <div className="w-[240px] rounded-xl border border-accent/30 bg-ink-900/70 backdrop-blur-xl p-3 text-[10px] font-mono">
      <div className="text-accent-soft tracking-widest mb-2">RAG · INDEX</div>
      <div className="space-y-1.5">
        <Bar label="vectors" value={86} />
        <Bar label="recall" value={94} />
        <Bar label="latency" value={42} />
      </div>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-ink-200 mb-0.5 text-[8px]">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
