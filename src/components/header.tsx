"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Pause, Play, X } from "lucide-react";
import { useExperience } from "./experience-provider";

const links = [{ id: "about", label: "About" }, { id: "work", label: "Work" }, { id: "expertise", label: "Expertise" }];

export function Header() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { reducedMotion, toggleMotion } = useExperience();
  const menuButton = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -50% 0px" });
    document.querySelectorAll("main > section[id]").forEach((section) => observer.observe(section));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.querySelector("main");
    if (main) main.inert = true;
    nav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
      if (e.key === "Tab") {
        const elements = [...(nav.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []), menuButton.current].filter(Boolean) as HTMLElement[];
        const index = elements.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && index === 0) { e.preventDefault(); elements.at(-1)?.focus(); }
        if (!e.shiftKey && index === elements.length - 1) { e.preventDefault(); elements[0]?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; if (main) main.inert = false; document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
      <a className="brand" href="#home" aria-label="Mohammad Muzamil, home" onClick={() => setMenuOpen(false)}>mm<span>.</span><span className="brand-slash">/</span></a>
      <nav ref={nav} id="primary-navigation" className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
        {links.map((link, i) => <a key={link.id} href={`#${link.id}`} className={active === link.id ? "active" : ""} onClick={() => setMenuOpen(false)}><span className="nav-index">0{i + 1}</span>{link.label}<span className="nav-dot" /></a>)}
        <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={15} /></a>
      </nav>
      <div className="header-tools">
        <button className="motion-toggle" onClick={toggleMotion} aria-label={reducedMotion ? "Enable animations" : "Pause animations"} title={reducedMotion ? "Enable animations" : "Pause animations"}>{reducedMotion ? <Play size={14} /> : <Pause size={14} />}</button>
        <button ref={menuButton} className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
    </header>
  );
}
