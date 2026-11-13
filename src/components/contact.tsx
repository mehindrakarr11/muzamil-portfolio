"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp, ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { profile } from "@/lib/content";
import { Reveal, SectionLabel } from "./reveal";

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return <span className="footer-time"><span className="status-dot" /> BENGALURU, IN <span>{time ?? "--:--"} IST</span></span>;
}

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  useEffect(() => {
    if (copyState === "idle") return;
    const timeout = window.setTimeout(() => setCopyState("idle"), 4000);
    return () => window.clearTimeout(timeout);
  }, [copyState]);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopyState("copied"); }
    catch { setCopyState("failed"); }
  };

  return <section id="contact" className="contact" aria-labelledby="contact-heading">
    <div className="contact-inner section-pad">
      <div className="section-heading-row"><SectionLabel number="05">LET’S START A CONVERSATION</SectionLabel><span className="contact-status mono"><span className="status-dot" /> OPEN TO CONNECT</span></div>
      <Reveal className="contact-heading"><h2 id="contact-heading">Good things start<br />with a <span className="serif-word">hello.</span><span className="violet">*</span></h2><a href={`mailto:${profile.email}`} className="contact-orb" aria-label="Send Muzamil an email"><ArrowUpRight strokeWidth={1} /><span>LET’S TALK</span></a></Reveal>
      <Reveal className="contact-bottom"><div className="contact-email-block"><p>A project, an opportunity, or a shared curiosity.<br />I’d love to hear what you have in mind.</p><div className="email-row"><a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={18} /></a><button onClick={copyEmail} className="copy-email" aria-label={copyState === "copied" ? "Email address copied" : "Copy email address"} title="Copy email address">{copyState === "copied" ? <Check size={16} /> : <Copy size={16} />}</button></div><span className="copy-status" role="status">{copyState === "copied" ? "Email copied to clipboard." : copyState === "failed" ? "Copy unavailable. Select the email above or open it in your email app." : ""}</span></div>
        <div className="contact-links"><a href={profile.resume} download>Download résumé <Download size={15} /></a><a href={`tel:${profile.phoneHref}`}>{profile.phone} <ArrowUpRight size={15} /></a>{profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15} /></a> : <span className="pending-social">LinkedIn <span>LINK TO BE CONFIRMED</span></span>}{profile.github ? <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} /></a> : <span className="pending-social">GitHub <span>LINK TO BE ADDED</span></span>}</div>
      </Reveal>
    </div>
    <footer className="site-footer"><a className="brand" href="#home" aria-label="Back to top">mm<span>.</span><span className="brand-slash">/</span></a><span className="footer-credit">© {new Date().getFullYear()} Mohammad Muzamil A.<br /><span>Thoughtfully built. Always evolving.</span></span><LocalTime /><a href="#home" className="back-top" aria-label="Back to top"><span className="mono">BACK TO TOP</span><ArrowUp size={17} /></a></footer>
    <div className="footer-ribbon"><span>CODE WITH PURPOSE.</span><ArrowRight /><span>BUILD WITH PERSPECTIVE.</span></div>
  </section>;
}
