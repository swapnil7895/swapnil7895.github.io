"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CLOUD = ["Python", "AWS Lambda", "AWS Batch", "CloudWatch", "Snowflake", "Selenium", "RPA", "pytest", "pytest-xdist", "SQL", "Bash", "CI/CD"];
const AI    = ["LangGraph", "ReAct Agents", "Gemini API", "OpenAI API", "FastAPI", "Pydantic", "RAG", "LLM Orchestration", "Vector DBs", "Prompt Engineering"];

export default function InteractiveSkillsSection() {
  const [active, setActive] = useState<"cloud" | "ai" | null>(null);

  const renderPanel = (
    id: "cloud" | "ai",
    label: string,
    sub: string,
    desc: string,
    tags: string[],
    color: string,
    colorFaint: string,
    colorBorder: string,
  ) => {
    const isActive = active === id;
    const isDim    = active !== null && !isActive;
    return (
      <motion.div
        layout
        animate={{ flex: isDim ? 0.6 : isActive ? 1.55 : 1 }}
        transition={{ type: "spring", stiffness: 230, damping: 28 }}
        onHoverStart={() => setActive(id)}
        onHoverEnd={() => setActive(null)}
        style={{
          background: "var(--surface)",
          border: `1px solid ${isActive ? colorBorder : "var(--border)"}`,
          borderRadius: "16px",
          padding: "36px",
          minHeight: "420px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          transition: "border-color 0.25s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isActive && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse at 0% 0%, ${colorFaint}, transparent 65%)`,
          }} />
        )}

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
          <span className="label" style={{ color }}>{sub}</span>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: "12px", lineHeight: 1.2 }}>
            {label}
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "28px" }}>
            {desc}
          </p>

          <motion.div
            animate={{ opacity: isDim ? 0.25 : 1 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto" }}
          >
            {tags.map(tag => (
              <span key={tag} style={{
                padding: "5px 13px", borderRadius: "9999px",
                fontSize: "0.78rem", fontWeight: 500,
                background: colorFaint, color, border: `1px solid ${colorBorder}`,
              }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="label">Expertise</span>
          <h2 className="heading">Skills &amp; Stack</h2>
          <p style={{ color: "var(--muted)", fontSize: "1rem", marginTop: "14px" }}>Hover to explore each stack</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          {renderPanel("cloud", "Cloud & Automation", "4.5+ yrs · Production", "End-to-end Python automation, cloud test pipelines and data quality frameworks shipped at enterprise scale.", CLOUD, "#10b981", "rgba(16,185,129,0.09)", "rgba(16,185,129,0.28)")}
          {renderPanel("ai", "AI / GenAI", "Actively Building", "LangGraph ReAct agents, RAG pipelines, and multi-model AI systems using Gemini and OpenAI APIs.", AI, "#a78bfa", "rgba(167,139,250,0.09)", "rgba(167,139,250,0.28)")}
        </div>
      </div>
    </section>
  );
}
