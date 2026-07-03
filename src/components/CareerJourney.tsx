"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  {
    period: "2014 – 2017",
    title: "Diploma · Mechanical Engineering",
    detail: "Built the problem-solving foundation — technical rigour before the pivot.",
  },
  {
    period: "2017 – 2021",
    title: "BE Mechanical Engineering",
    highlight: "9.16 CGPA · Topped the Program",
    detail: "Topped the batch. The real shift was happening on the side — self-learning Python and automation while still in college.",
  },
  {
    period: "2021",
    title: "Career Pivot into Software",
    detail: "Moved deliberately from Mechanical into IT. No bootcamp — self-driven, project-first approach.",
  },
  {
    period: "2021 – 2024",
    title: "Python Automation Engineer · Eviden",
    highlight: "Formerly Atos Syntel · ~3.5 years",
    detail: "Built Python automation frameworks, Selenium test suites, and RPA workflows for enterprise clients.",
  },
  {
    period: "2024 – Present",
    title: "SDET · DataLens, Nutanix",
    highlight: "via Vigoursoft Pvt Ltd",
    detail: "Cloud data QA on DataLens: AWS Lambda, AWS Batch, Snowflake, CloudWatch. pytest-xdist parallelization cut suite runtime significantly.",
  },
  {
    period: "Now",
    title: "Building → AI Engineering",
    detail: "Shipping LangGraph ReAct agents, RAG pipelines, and multi-model AI systems. Targeting AI Engineering roles.",
    isCurrent: true,
  },
];

export default function CareerJourney() {
  return (
    <section id="career" style={{ background: "var(--bg)", padding: "120px 0" }}>
      <div className="section-inner">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="eyebrow mb-5">Journey</p>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 3.75rem)", fontWeight: 800, color: "var(--text)" }}>
            Career Timeline
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem", marginTop: "16px" }}>
            From mechanical drawings to AI agents.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "0",
            top: "12px",
            bottom: "12px",
            width: "1px",
            background: "linear-gradient(to bottom, transparent, var(--border-2) 10%, var(--border-2) 90%, transparent)",
          }} />

          <div style={{ paddingLeft: "40px", display: "flex", flexDirection: "column", gap: "52px" }}>
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                style={{ position: "relative" }}
              >
                {/* Dot */}
                <div style={{
                  position: "absolute",
                  left: "-44px",
                  top: "6px",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: m.isCurrent ? "var(--accent)" : "var(--surface-2)",
                  border: `2px solid ${m.isCurrent ? "var(--accent)" : "var(--border-2)"}`,
                  boxShadow: m.isCurrent ? "0 0 12px rgba(16,185,129,0.6)" : "none",
                }} />

                {/* Period */}
                <p style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: m.isCurrent ? "var(--accent)" : "var(--muted-2)",
                  marginBottom: "6px",
                }}>
                  {m.period}
                </p>

                {/* Title */}
                <h3 style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: m.highlight ? "6px" : "10px",
                  lineHeight: 1.3,
                }}>
                  {m.title}
                </h3>

                {/* Highlight */}
                {m.highlight && (
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent)", marginBottom: "10px" }}>
                    {m.highlight}
                  </p>
                )}

                {/* Detail */}
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75 }}>
                  {m.detail}
                </p>

                {/* Current badge */}
                {m.isCurrent && (
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "12px",
                    padding: "5px 14px",
                    borderRadius: "9999px",
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    color: "var(--accent)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                  }}>
                    <span style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: "var(--accent)", display: "inline-block",
                      animation: "pulse 2s infinite",
                    }} />
                    Currently Building
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
