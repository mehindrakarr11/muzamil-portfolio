"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Download, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/lib/content";
import { useExperience } from "./experience-provider";

// Let the name entrance complete before compiling the WebGL scene on slower devices.
const Sculpture = dynamic(() => new Promise<void>(resolve => setTimeout(resolve, 1500)).then(() => import("./sculpture")), { ssr: false, loading: () => <div className="sculpture-fallback"><div /><div /><div /></div> });

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const { reducedMotion } = useExperience();

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.to(".hero-art", { y: 100, rotate: 7, ease: "none", scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".hero-title-inner", { y: 65, ease: "none", scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: 1 } });
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={section} className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-topline mono"><span><span className="status-dot" /> OPEN TO CONNECT</span><span className="hero-coordinate">12.97° N &nbsp; 77.59° E</span></div>
      <div className="hero-content">
        <motion.p className="hero-kicker" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}><span className="tiny-line" /> FULL STACK & DATA ANALYTICS DEVELOPER</motion.p>
        <div className="hero-title-inner">
          <h1 id="hero-heading" className="hero-title" aria-label={profile.name}>
            <span className="title-line"><motion.span aria-hidden="true" initial={{ y: reducedMotion ? 0 : "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>Mohammad</motion.span></span>
            <span className="title-line"><motion.span aria-hidden="true" initial={{ y: reducedMotion ? 0 : "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}>Muzamil<span className="name-initial"> A</span><span className="violet">.</span></motion.span></span>
          </h1>
        </div>
        <motion.div className="hero-intro" initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.6 }}>
          <p>I build at the intersection of<br /><span>thoughtful code & meaningful data.</span></p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={18} /></a>
            <a className="button button-text" href={profile.resume} download>Download résumé <Download size={16} /></a>
          </div>
        </motion.div>
      </div>
      <motion.div className="hero-art" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, delay: 0.2 }} aria-hidden="true">
        <div className="art-glow" />
        <svg className="art-orbits" viewBox="0 0 600 600"><ellipse cx="300" cy="300" rx="280" ry="120" transform="rotate(-35 300 300)" /><ellipse cx="300" cy="300" rx="275" ry="205" transform="rotate(30 300 300)" /><path d="M300 12V28M300 572V588M12 300H28M572 300H588" /><circle cx="70" cy="430" r="3" /><circle cx="531" cy="174" r="3" /></svg>
        <Sculpture />
        <span className="art-annotation art-annotation-top"><Plus size={12} /> FIG. 01 — CONTINUOUS CURIOSITY</span>
        <span className="art-annotation art-annotation-bottom"><span className="art-mini-dot" /> {reducedMotion ? "FORM / STATIC STUDY" : "MOVE YOUR CURSOR TO EXPLORE"}</span>
      </motion.div>
      <div className="hero-bottom">
        <a href="#about" className="scroll-cue"><span className="scroll-circle"><ArrowDown size={17} /></span><span className="mono">SCROLL TO DISCOVER</span></a>
        <div className="hero-location"><span className="mono">BASED IN BENGALURU, INDIA</span><span>Building with a wider perspective <ArrowUpRight size={13} /></span></div>
        <span className="hero-edition mono">PORTFOLIO — VOL. 01</span>
      </div>
    </section>
  );
}
