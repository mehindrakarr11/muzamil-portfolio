"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Asterisk } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, SectionLabel } from "./reveal";
import { useExperience } from "./experience-provider";

const statement = "Curiosity is the starting point. Building something useful is the goal.";

export function About() {
  const root = useRef<HTMLElement>(null);
  const { reducedMotion } = useExperience();

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".story-word", { opacity: 0.22 }, { opacity: 1, stagger: 0.16, ease: "none", scrollTrigger: { trigger: ".story-statement", start: "top 85%", end: "bottom 45%", scrub: 0.5 } });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return <section id="about" className="about section-pad" ref={root} aria-labelledby="about-heading">
    <div className="section-heading-row"><SectionLabel number="01">THE PERSON BEHIND THE CODE</SectionLabel><Asterisk size={25} strokeWidth={1} className="about-asterisk" /></div>
    <h2 id="about-heading" className="story-statement" aria-label={statement}>{statement.split(" ").map((word, index) => <span key={index} className={`story-word ${index > 7 ? "story-accent" : ""}`} aria-hidden="true">{word} </span>)}</h2>
    <div className="about-bottom">
      <Reveal className="about-signature"><span className="signature-mark">m<span>m</span><i>.</i></span><span className="mono">DEVELOPER. DATA THINKER.<br />ALWAYS A STUDENT.</span></Reveal>
      <Reveal className="about-copy" delay={0.1}><p>I’m Muzamil, a developer in Bengaluru exploring the space where web applications meet data intelligence.</p><p>My journey began in electronics and communication. Today, I’m pursuing a BE in Computer Science & Business Systems, bringing that systems perspective to React interfaces, Node.js APIs, and predictive models in Python.</p><a className="inline-link" href="#journey">A little more about my journey <ArrowUpRight size={16} /></a></Reveal>
    </div>
    <div className="principles"><span><span className="principle-dot" /> THINK IN SYSTEMS</span><span><span className="principle-dot" /> BUILD WITH INTENT</span><span><span className="principle-dot" /> STAY CURIOUS</span></div>
  </section>;
}
