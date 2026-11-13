"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useExperience } from "./experience-provider";

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Fallback /> : this.props.children; }
}

function Fallback() { return <div className="sculpture-fallback"><div /><div /><div /></div>; }

function MetalKnot({ animate }: { animate: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const cursor = useRef({ x: 0, y: 0 });
  const clock = useRef(0);
  const { gl, scene, invalidate } = useThree();

  useEffect(() => {
    invalidate();
    if (!animate) return;
    // Thirty frames per second is ample for this slow decorative rotation.
    const timer = window.setInterval(invalidate, 1000 / 30);
    return () => window.clearInterval(timer);
  }, [animate, invalidate]);

  useEffect(() => {
    const environment = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const texture = generator.fromScene(environment, 0.04, 0.1, 100, { size: 64 });
    // Three.js scenes are imperative objects owned by the renderer, not React state.
    // eslint-disable-next-line react-hooks/immutability
    scene.environment = texture.texture;
    scene.environmentIntensity = 1.2;
    invalidate();
    return () => { scene.environment = null; texture.dispose(); generator.dispose(); environment.dispose(); };
  }, [gl, scene, invalidate]);

  useEffect(() => {
    if (!animate || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => { cursor.current = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 }; };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [animate]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    if (animate) clock.current += Math.min(delta, 0.04);
    const time = clock.current;
    const targetX = 0.35 + cursor.current.y * 0.17;
    const targetY = -0.6 + time * 0.075 + cursor.current.x * 0.2;
    mesh.current.rotation.x = THREE.MathUtils.damp(mesh.current.rotation.x, targetX, 3, delta);
    mesh.current.rotation.y = THREE.MathUtils.damp(mesh.current.rotation.y, targetY, 3, delta);
    mesh.current.rotation.z = -0.35 + Math.sin(time * 0.2) * 0.08;
    mesh.current.position.y = Math.sin(time * 0.65) * 0.07;
  });

  return <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[-3, 4, 5]} color="#e9e4ff" intensity={3} />
    <directionalLight position={[4, -2, 2]} color="#9862ff" intensity={4} />
    <directionalLight position={[-4, -1, -2]} color="#83bdff" intensity={3} />
    <mesh ref={mesh} rotation={[0.35, -0.6, -0.35]}>
      <torusKnotGeometry args={[1.36, 0.42, 192, 32, 2, 3]} />
      <meshStandardMaterial color="#81768e" metalness={1} roughness={0.24} />
    </mesh>
  </>;
}

export default function Sculpture() {
  const { reducedMotion } = useExperience();
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    if (container.current) observer.observe(container.current);
    const visibility = () => setVisible(document.visibilityState === "visible" && (container.current?.getBoundingClientRect().bottom ?? 0) > 0);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  return <div ref={container} className="sculpture-canvas"><CanvasBoundary><Canvas fallback={<Fallback />} dpr={[1, 1.25]} camera={{ position: [0, 0, 9.5], fov: 40 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} frameloop="demand"><MetalKnot animate={!reducedMotion && visible} /></Canvas></CanvasBoundary></div>;
}
