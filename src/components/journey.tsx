"use client";

import { ArrowUpRight, GraduationCap, Plus } from "lucide-react";
import { certifications, education } from "@/lib/content";
import { Reveal, SectionLabel } from "./reveal";

export function Journey() {
  return <section id="journey" className="journey section-pad" aria-labelledby="journey-heading">
    <SectionLabel number="04">ALWAYS IN THE MAKING</SectionLabel>
    <Reveal className="journey-heading"><h2 id="journey-heading">The learning<br />never <span className="serif-word">stops.</span></h2><p>From circuits to systems.<br />An evolving engineering perspective.</p></Reveal>
    <div className="education-list">{education.map((item, index) => <Reveal key={item.degree} className="education-row" delay={index * 0.08}>
      <div className="education-date"><span className="education-timeline-dot" /><span className="mono">{item.dates}</span><span className={`education-status ${index === 0 ? "current" : ""}`}>{item.status}</span></div>
      <div className="education-main"><span>{item.degree}</span><h3>{item.title}</h3><p>{item.school}</p><small>{item.location}</small></div><GraduationCap className="education-icon" size={27} strokeWidth={1} />
    </Reveal>)}</div>
    <div className="certification-heading"><span className="mono">LEARNING BEYOND THE CLASSROOM</span><span className="mono muted">06 / CERTIFICATIONS & EXPERIENCES</span></div>
    <div className="certification-grid">{certifications.map((cert, i) => <Reveal key={cert.title} delay={(i % 2) * 0.06}><details className="certification"><summary><span className="cert-number mono">0{i + 1}</span><span className="cert-title"><strong>{cert.title}</strong><span>{cert.provider}</span></span><Plus className="cert-plus" size={18} strokeWidth={1.2} /></summary><div className="cert-details"><span>{cert.type}</span><p>{cert.detail}</p><small>Credential link to be added <ArrowUpRight size={11} /></small></div></details></Reveal>)}</div>
  </section>;
}
