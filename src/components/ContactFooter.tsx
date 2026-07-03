"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Download, Copy, Check, MapPin } from "lucide-react";

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

import { config } from "@/config";

const EMAIL = config.email; 
const LINKEDIN_URL = config.linkedin; 
const GITHUB_URL = config.github; 

const BTN_BASE: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 24px",
  borderRadius: "9999px",
  fontSize: "0.875rem",
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
  transition: "all 0.2s",
  fontFamily: "var(--font)",
  border: "none",
};

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); }
    catch { /* fallback */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contact" style={{ background: "var(--bg)", padding: "120px 0 80px", borderTop: "1px solid var(--border)" }}>
      <div className="section-inner text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-5">Contact</p>

          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 3.75rem)", fontWeight: 800, color: "var(--text)", marginBottom: "20px" }}>
            Let&apos;s Connect
          </h2>

          <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: "460px", margin: "0 auto 12px", lineHeight: 1.75 }}>
            {config.location.split(",")[0]}-based, open to remote. Reach out about{" "}
            <span style={{ color: "var(--text)", fontWeight: 500 }}>Python · SDET · AI Engineering</span>{" "}
            roles.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "var(--muted-2)", fontSize: "0.85rem", marginBottom: "52px" }}>
            <MapPin size={14} />
            {config.location} · {config.locationDetails}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "64px" }}
        >
          {/* Copy email — primary */}
          <button
            id="copy-email-btn"
            onClick={copyEmail}
            style={{
              ...BTN_BASE,
              background: "var(--accent)",
              color: "#000",
              padding: "14px 28px",
              fontWeight: 700,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Email"}
          </button>

          {/* Download Resume */}
          <a id="download-resume-btn" href={config.resumeUrl} download
            style={{ ...BTN_BASE, background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border-2)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--muted)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <Download size={16} /> Resume
          </a>

          {/* LinkedIn */}
          <a id="linkedin-btn" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
            style={{ ...BTN_BASE, background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border-2)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#60a5fa"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(96,165,250,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <LinkedinIcon /> LinkedIn
          </a>

          {/* GitHub */}
          <a id="github-btn" href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
            style={{ ...BTN_BASE, background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border-2)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--muted)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <GithubIcon /> GitHub
          </a>

          {/* Email */}
          <a href={`mailto:${EMAIL}`}
            style={{ ...BTN_BASE, background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border-2)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--muted)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <Mail size={16} /> Email Me
          </a>
        </motion.div>

        <p style={{ color: "var(--muted-2)", fontSize: "0.8rem" }}>
          © {new Date().getFullYear()} {config.name} · Built with Next.js
        </p>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: "fixed", bottom: "32px", left: "50%", transform: "translateX(-50%)",
              zIndex: 100, display: "flex", alignItems: "center", gap: "8px",
              background: "var(--accent)", color: "#000", fontWeight: 700,
              fontSize: "0.875rem", padding: "12px 24px", borderRadius: "9999px",
              boxShadow: "0 8px 32px rgba(16,185,129,0.4)",
            }}
          >
            <Check size={16} /> Email copied!
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
