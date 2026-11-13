"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowRight, Braces, Database, Workflow } from "lucide-react";
import { skillGroups } from "@/lib/content";
import { Reveal, SectionLabel } from "./reveal";

const icons = [Braces, Database, Workflow];

export function Expertise() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = skillGroups[selected];
  const Icon = icons[selected];

  function keyboardSelect(event: React.KeyboardEvent, index: number) {
    let next: number | undefined;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % skillGroups.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + skillGroups.length - 1) % skillGroups.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = skillGroups.length - 1;
    if (next !== undefined) { event.preventDefault(); setSelected(next); tabs.current[next]?.focus(); }
  }

  return <section id="expertise" className="expertise section-pad" aria-labelledby="expertise-heading">
    <SectionLabel number="03">MY TOOLKIT</SectionLabel>
    <Reveal className="expertise-heading"><h2 id="expertise-heading">Different tools.<br /><span className="muted-heading">One connected mindset.</span></h2><ArrowDownRight className="expertise-arrow" size={60} strokeWidth={0.8} /></Reveal>
    <Reveal className="expertise-layout">
      <div className="expertise-tabs" role="tablist" aria-label="Technical expertise" aria-orientation="vertical">{skillGroups.map((skill, i) => <button ref={(node) => { tabs.current[i] = node; }} key={skill.id} role="tab" id={`tab-${skill.id}`} aria-controls={`panel-${skill.id}`} aria-selected={selected === i} tabIndex={selected === i ? 0 : -1} className={selected === i ? "selected" : ""} onClick={() => setSelected(i)} onKeyDown={(e) => keyboardSelect(e, i)}><span className="mono">{skill.number}</span><span>{skill.label}</span><ArrowRight size={19} /></button>)}</div>
      <div className="expertise-panel" role="tabpanel" id={`panel-${group.id}`} aria-labelledby={`tab-${group.id}`} tabIndex={0}>
        <AnimatePresence mode="wait"><motion.div key={group.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          <div className="expertise-panel-head"><Icon size={29} strokeWidth={1.2} /><span className="mono">{group.note}</span></div>
          <h3>{group.title}</h3><p>{group.description}</p><div className="skill-chips">{group.skills.map((skill) => <span key={skill}><span />{skill}</span>)}</div>
        </motion.div></AnimatePresence>
      </div>
    </Reveal>
  </section>;
}
