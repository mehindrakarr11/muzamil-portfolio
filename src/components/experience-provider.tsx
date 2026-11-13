"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

const ExperienceContext = createContext({ reducedMotion: false, toggleMotion: () => {} });
export const useExperience = () => useContext(ExperienceContext);

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getMotionPreference = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerMotionPreference = () => false;

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const systemReduced = useSyncExternalStore(subscribeMotion, getMotionPreference, getServerMotionPreference);
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const reducedMotion = motionOverride ?? Boolean(systemReduced);

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduced" : "full";
    if (reducedMotion) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: { offset: -90 }, autoRaf: true });
    return () => lenis.destroy();
  }, [reducedMotion]);

  return (
    <ExperienceContext.Provider value={{ reducedMotion, toggleMotion: () => setMotionOverride(!reducedMotion) }}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </ExperienceContext.Provider>
  );
}
