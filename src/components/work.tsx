"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, ChartNoAxesCombined, Check, CircleDashed, Database, Layers3, Maximize2, X } from "lucide-react";
import { project } from "@/lib/content";
import { Reveal, SectionLabel } from "./reveal";

const chartSets = {
  Electronics: { actual: "M0 130 C25 140 35 110 60 115 S95 70 120 86 S155 132 180 110 S215 60 240 74 S275 40 300 53", forecast: "M300 53 C325 60 335 25 360 34 S395 20 420 14", area: "M300 29 C350 5 380 7 420 0 L420 48 C380 55 350 65 300 80 Z" },
  Essentials: { actual: "M0 150 C20 140 40 145 60 126 S95 136 120 110 S155 120 180 91 S210 105 240 78 S270 92 300 65", forecast: "M300 65 C325 60 335 65 360 45 S395 40 420 33", area: "M300 42 C340 33 380 15 420 8 L420 59 C380 70 340 83 300 88 Z" },
  Lifestyle: { actual: "M0 120 C20 150 40 80 60 88 S95 50 120 100 S155 145 180 93 S215 118 240 64 S280 39 300 62", forecast: "M300 62 C325 89 340 60 360 48 S395 60 420 25", area: "M300 35 C340 45 380 18 420 0 L420 64 C380 93 340 103 300 90 Z" },
};
type Category = keyof typeof chartSets;

export function ForecastIllustration() {
  const [category, setCategory] = useState<Category>("Electronics");
  const data = chartSets[category];
  return <div className="forecast-frame">
    <div className="dashboard-top"><div className="dashboard-brand"><Layers3 size={17} /><strong>signal<span> / </span></strong><span>DEMAND INTELLIGENCE</span></div><span className="dashboard-system"><span /> SYSTEM OVERVIEW</span></div>
    <div className="dashboard-body">
      <div className="dashboard-side" aria-hidden="true"><span className="dashboard-side-active"><ChartNoAxesCombined size={16} /></span><Database size={16} /><Layers3 size={16} /><CircleDashed size={16} /><span className="dashboard-avatar">M</span></div>
      <div className="dashboard-main">
        <div className="dashboard-title"><div><span className="mono dashboard-eyebrow">INTELLIGENCE / FORECASTING</span><h4>See what’s next.</h4></div><span className="sample-tag">SAMPLE DATA</span></div>
        <div className="chart-toolbar"><span>Demand forecast</span><div className="chart-categories" aria-label="Sample product category">{(Object.keys(chartSets) as Category[]).map(c => <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div></div>
        <div className="chart-area" role="img" aria-label={`Illustrative ${category.toLowerCase()} demand chart with historical and forecast curves. Sample data, not project results.`}>
          <div className="chart-axis"><span>100</span><span>75</span><span>50</span><span>25</span></div>
          <svg viewBox="0 0 420 190" preserveAspectRatio="none"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a384ef" stopOpacity="0.17" /><stop offset="100%" stopColor="#a384ef" stopOpacity="0" /></linearGradient></defs><g className="chart-grid"><path d="M0 20H420M0 65H420M0 110H420M0 155H420" /><path d="M0 0V180M60 0V180M120 0V180M180 0V180M240 0V180M300 0V180M360 0V180M420 0V180" /></g><path d={`${data.actual} L300 180 L0 180Z`} fill="url(#chart-fill)" /><path d={data.area} fill="#a384ef" fillOpacity="0.12" /><path className="chart-history" d={data.actual} /><path className="chart-forecast" d={data.forecast} /><path d="M300 0V180" stroke="#b2a3d2" strokeOpacity="0.3" strokeDasharray="3 5" /><circle cx="300" cy={category === "Electronics" ? "53" : category === "Essentials" ? "65" : "62"} r="5" fill="#c0a7ff" stroke="#382957" strokeWidth="5" /></svg>
          <span className="forecast-label">FORECAST <ArrowUpRight size={10} /></span>
        </div>
        <div className="chart-months"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span></div>
        <div className="chart-bottom"><span><i className="legend-actual" /> Historical demand</span><span><i className="legend-forecast" /> Predicted demand</span><span className="chart-model">Scikit-learn <Check size={10} /></span></div>
      </div>
    </div>
    <div className="dashboard-bottom"><span><span className="mini-status" /> REACT + PYTHON</span><span>ILLUSTRATIVE INTERFACE · NOT PROJECT OUTPUT</span></div>
  </div>;
}

export function Work() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const oldOverflow = useRef("");

  const openProject = () => {
    oldOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    setOpen(true);
  };
  const closeProject = () => dialog.current?.close();
  const onClose = () => { document.body.style.overflow = oldOverflow.current; setOpen(false); opener.current?.focus(); };
  const trapDialogFocus = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const items = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]')];
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };

  return <section id="work" className="work section-pad" aria-labelledby="work-heading">
    <div className="section-heading-row"><SectionLabel number="02">SELECTED WORK</SectionLabel><span className="mono muted">A CLOSER LOOK AT WHAT I BUILD</span></div>
    <Reveal className="work-heading"><h2 id="work-heading">Ideas, made <span className="serif-word">real.</span></h2><p>Connecting the interface<br />to the intelligence beneath it.</p></Reveal>
    <Reveal className="project-visual-wrap">
      <div className="project-visual">
        <div className="project-visual-grain" aria-hidden="true" />
        <div className="project-visual-top"><span className="mono">01 / FEATURED PROJECT</span><span className="project-concept-label"><CircleDashed size={12} /> {project.screenshot ? "PROJECT SCREENSHOT" : "INTERFACE CONCEPT"}</span></div>
        <div className="project-orbit" aria-hidden="true" />
        {project.screenshot ? <div className="project-screenshot-frame"><Image src={project.screenshot} alt="Supply Chain Intelligence application interface" fill sizes="(max-width: 767px) 90vw, 75vw" style={{ objectFit: "contain" }} /></div> : <ForecastIllustration />}
        <div className="project-visual-foot"><span className="mono">TURNING COMPLEXITY INTO CLARITY</span>{!project.screenshot && <span className="visual-interactive"><Maximize2 size={13} /> TRY THE CATEGORY FILTERS</span>}</div>
      </div>
    </Reveal>
    <Reveal className="project-info">
      <div className="project-info-main"><span className="project-category">FULL STACK / MACHINE LEARNING</span><h3>{project.title}</h3><p>{project.summary}</p><div className="tech-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></div>
      <button className="project-open" ref={opener} onClick={openProject} aria-haspopup="dialog"><span className="project-open-circle"><ArrowUpRight size={28} strokeWidth={1.3} /></span><span>Explore the project</span></button>
    </Reveal>
    <div className="work-note"><Asterisk className="note-star" size={22} /><p>A work in progress. A practice of getting better.</p><a href="#contact">Let’s build what’s next <ArrowDownRight size={16} /></a></div>
    <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onClose={onClose} onKeyDown={trapDialogFocus} onClick={(e) => { if (e.target === e.currentTarget) closeProject(); }} data-lenis-prevent>
      <div className="dialog-content">
        <button className="dialog-close" aria-label="Close project details" onClick={closeProject}><X size={22} /></button>
        <span className="mono violet">PROJECT 01 / TECHNICAL OVERVIEW</span>
        <h2 id="project-dialog-title">{project.title}</h2><p className="dialog-lead">{project.summary}</p>
        <div className="tech-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
        <div className="architecture"><span><Layers3 size={20} /> React interface</span><ArrowRight size={18} /><span><Database size={20} /> REST API + MongoDB</span><ArrowRight size={18} /><span><ChartNoAxesCombined size={20} /> Python + ML</span></div>
        <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="project-detail-list">{project.details.map((detail, i) => <article key={detail.title}><span className="mono">0{i + 1}</span><div><h3>{detail.title}</h3><p>{detail.text}</p></div></article>)}</motion.div>}</AnimatePresence>
        <div className="project-placeholders"><span className="mono">PROJECT ASSETS</span><p>Live demo {project.demo ? <a href={project.demo} target="_blank" rel="noopener noreferrer">Visit live demo ↗</a> : <span>Link to be added</span>}</p><p>Source code {project.repository ? <a href={project.repository} target="_blank" rel="noopener noreferrer">View repository ↗</a> : <span>Repository link to be added</span>}</p><p>Project screenshots {project.screenshot ? <a href={project.screenshot} target="_blank" rel="noopener noreferrer">View screenshot ↗</a> : <span>To be added</span>}</p>{!project.screenshot && <small>The interactive preview is a concept illustration using sample data. It is not a screenshot of the original application.</small>}</div>
        <a href="mailto:mohammadmuzamila403@gmail.com?subject=Let%27s%20talk%20about%20Supply%20Chain%20Intelligence" className="button button-primary">Ask me about this project <ArrowUpRight size={16} /></a>
      </div>
    </dialog>
  </section>;
}
