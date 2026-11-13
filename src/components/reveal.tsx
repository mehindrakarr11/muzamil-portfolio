"use client";

import { motion } from "motion/react";
import { useExperience } from "./experience-provider";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { reducedMotion } = useExperience();
  return <motion.div className={`reveal ${className}`} initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: reducedMotion ? 0 : 0.8, delay }}>{children}</motion.div>;
}

export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span className="section-number">{number}</span><span>{children}</span></div>;
}
