"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";

const PHRASES = config.hero.typingPhrases;

function useTyping(phrases: string[], speed = 60, pause = 2400) {
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = phrases[pi];
    let t: NodeJS.Timeout;
    if (!del && ci < cur.length)        t = setTimeout(() => setCi(c => c + 1), speed);
    else if (!del && ci === cur.length) t = setTimeout(() => setDel(true), pause);
    else if (del && ci > 0)             t = setTimeout(() => setCi(c => c - 1), speed / 2);
    else { t = setTimeout(() => { setDel(false); setPi(i => (i + 1) % phrases.length); }, speed / 2); }
    return () => clearTimeout(t);
  }, [ci, del, pi, phrases, speed, pause]);
  return phrases[pi].slice(0, ci);
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const typed = useTyping(PHRASES);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let id: number, t = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", e => {
      mouse.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    });

    const draw = () => {
      t += 0.0015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;

      // Very subtle warm glow — NOT blue
      [
        { x: (0.3 + mouse.current.x * 0.1 + Math.sin(t) * 0.07) * W, y: (0.4 + Math.cos(t * 0.8) * 0.08) * H, r: W * 0.45, c: "rgba(16,185,129,0.055)" },
        { x: (0.75) * W, y: (0.25) * H, r: W * 0.3, c: "rgba(167,139,250,0.04)" },
        { x: (0.5 + Math.sin(t * 0.6) * 0.1) * W, y: H * 0.7, r: W * 0.35, c: "rgba(16,185,129,0.025)" },
      ].forEach(({ x, y, r, c }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, c); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="hero"
      style={{ background: "var(--bg)", minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

      {/* Very subtle dot grid — purely decorative */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
      }} />

      {/* Desktop Profile Image (Faded left side) */}
      {config.hero.profileImage && (
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "50%", 
            zIndex: 0,
            backgroundImage: `url(${config.hero.profileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center left",
            opacity: 0.45, 
            mixBlendMode: "luminosity",
            maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Mobile Profile Image (Faded top down) */}
      {config.hero.profileImageMobile && (
        <motion.div
          className="block md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%", 
            zIndex: 0,
            backgroundImage: `url(${config.hero.profileImageMobile})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: 0.35, 
            mixBlendMode: "luminosity",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
            pointerEvents: "none",
          }}
        />
      )}

      <div className="container relative z-10 text-right md:text-center px-7">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-12 w-full justify-end md:justify-center"
        >
          <span style={{
            padding: "6px 16px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600,
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
            color: "var(--accent)", letterSpacing: "0.04em",
            display: "inline-flex", alignItems: "center", gap: "7px",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "pulse 2s infinite" }} />
            {config.hero.statusBadge}
          </span>
        </motion.div>

        {/* Big headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: "clamp(3.5rem, 9vw, 6rem)",
            fontWeight: 900,
            color: "var(--text)",
            marginBottom: "24px",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
          }}
        >
          Hi, I&apos;m{" "}
          <span style={{ color: "var(--accent)" }}>{config.name}</span>.
        </motion.h1>

        {/* Role typing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center justify-end md:justify-center mb-5 gap-1"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            fontWeight: 500,
            color: "var(--text-2)",
            height: "2rem",
          }}
        >
          {typed}
          <span style={{ display: "inline-block", width: "2px", height: "1.2em", background: "var(--accent)", borderRadius: "2px" }} className="animate-pulse" />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            color: "var(--muted)",
            maxWidth: "500px",
            lineHeight: 1.8,
            fontWeight: 400,
          }}
          className="ml-auto md:mx-auto mb-12"
        >
          {config.hero.subtext}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3 justify-end md:justify-center flex-wrap"
        >
          <a href="#projects" style={{
            padding: "13px 30px", borderRadius: "10px",
            background: "var(--accent)", color: "#000",
            fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.01em",
            transition: "all 0.15s", display: "inline-flex", alignItems: "center",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--accent-2)"; el.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--accent)"; el.style.transform = "translateY(0)"; }}
          >
            View My Work
          </a>
          <a href="#contact" style={{
            padding: "13px 30px", borderRadius: "10px",
            background: "var(--surface)", color: "var(--text)",
            fontWeight: 600, fontSize: "0.9rem",
            border: "1px solid var(--border-2)",
            transition: "all 0.15s", display: "inline-flex", alignItems: "center",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--muted)"; el.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-2)"; el.style.transform = "translateY(0)"; }}
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-10 justify-end md:justify-center flex-wrap mt-[72px] pt-10"
          style={{
            borderTop: "1px solid var(--border)",
          }}
        >
          {config.hero.stats.map(({ num, label }) => (
            <div key={label} className="text-right md:text-center">
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>{num}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 500, marginTop: "2px", letterSpacing: "0.04em" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
