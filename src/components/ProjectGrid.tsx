"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

function GithubIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    </svg>
  );
}

const PROJECTS = [
  {
    id: "travel-agent",
    title: "Travel Reimbursement Approval Agent",
    description: "LangGraph ReAct agent with multi-model Gemini API fallback. FastAPI backend, chat-style UI, Pydantic-validated tool calls for policy checks and approval workflows.",
    tags: ["LangGraph", "Gemini API", "FastAPI", "Pydantic", "ReAct", "Python"],
    categories: ["GenAI"],
    github: "https://github.com/swapnil7895/travel-approval-agent",
    flagship: true,
    color: "#10b981",
    colorDim: "rgba(16,185,129,0.12)",
    colorBorder: "rgba(16,185,129,0.2)",
  },
  {
    id: "job-bot",
    title: "Job Application Automation Bot",
    description: "Selenium bot applying to LinkedIn & Naukri roles with tailored responses per listing generated via Google AI API. Reads JDs, adapts cover content automatically.",
    tags: ["Selenium", "Google AI API", "Python", "Automation", "Naukri"],
    categories: ["GenAI", "Automation"],
    github: "https://github.com/swapnil7895/job-apply-automation",
    color: "#60a5fa",
    colorDim: "rgba(96,165,250,0.1)",
    colorBorder: "rgba(96,165,250,0.18)",
  },
  {
    id: "qa-chatbot",
    title: "Conversational Q&A App",
    description: "Chatbot with runtime provider switching between OpenAI and Gemini APIs. Users toggle LLM providers mid-session without losing conversation context.",
    tags: ["OpenAI API", "Gemini API", "FastAPI", "Python", "Streaming"],
    categories: ["GenAI"],
    github: "#",
    color: "#a78bfa",
    colorDim: "rgba(167,139,250,0.1)",
    colorBorder: "rgba(167,139,250,0.18)",
  },
  {
    id: "datalens-qa",
    title: "Cloud Data QA — DataLens",
    description: "AWS Lambda & Batch test suite for Snowflake-backed cloud data at Nutanix. CloudWatch monitoring, pytest-xdist parallelization significantly cut runtime.",
    tags: ["AWS Lambda", "AWS Batch", "Snowflake", "CloudWatch", "pytest-xdist"],
    categories: ["Automation", "SDET"],
    github: "#",
    color: "#fb923c",
    colorDim: "rgba(251,146,60,0.1)",
    colorBorder: "rgba(251,146,60,0.18)",
  },
];

const FILTERS = ["All", "GenAI", "Automation", "SDET"];

function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 250, damping: 30 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 250, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, ...style }}
      onMouseMove={e => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectGrid() {
  const [filter, setFilter] = useState("All");
  const filtered = PROJECTS.filter(p => filter === "All" || p.categories.includes(filter));

  return (
    <section id="projects" style={{ background: "var(--bg)", padding: "120px 0" }}>
      <div className="section-inner">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-5">Work</p>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 3.75rem)", fontWeight: 800, color: "var(--text)" }}>
            Projects
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map(f => (
            <button
              key={f}
              id={`filter-${f.toLowerCase()}`}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 22px",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                background: filter === f ? "var(--text)" : "transparent",
                color: filter === f ? "#000" : "var(--muted)",
                border: `1px solid ${filter === f ? "var(--text)" : "var(--border-2)"}`,
                fontFamily: "var(--font)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div layout className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <TiltCard>
                  <div
                    style={{
                      background: "var(--surface)",
                      border: `1px solid ${p.flagship ? p.colorBorder : "var(--border)"}`,
                      borderRadius: "16px",
                      padding: "36px 40px",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = p.colorBorder;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${p.colorDim}`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = p.flagship ? p.colorBorder : "var(--border)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Top row */}
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                      <div>
                        {p.flagship && (
                          <span
                            className="inline-flex items-center gap-1.5 mb-3"
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: p.color,
                              background: p.colorDim,
                              border: `1px solid ${p.colorBorder}`,
                              padding: "4px 12px",
                              borderRadius: "9999px",
                              display: "inline-flex",
                            }}
                          >
                            <Star size={11} />
                            Flagship Project
                          </span>
                        )}
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>
                          {p.title}
                        </h3>
                      </div>
                      {p.github && p.github !== "#" && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`github-${p.id}`}
                          className="flex-shrink-0"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "var(--muted)",
                            textDecoration: "none",
                            border: "1px solid var(--border-2)",
                            borderRadius: "9999px",
                            padding: "6px 14px",
                            transition: "all 0.2s",
                            whiteSpace: "nowrap",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.color = "var(--text)";
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--muted)";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)";
                          }}
                        >
                          <GithubIcon />
                          GitHub
                        </a>
                      )}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "20px" }}>
                      {p.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            padding: "5px 12px",
                            borderRadius: "9999px",
                            fontSize: "0.78rem",
                            fontWeight: 500,
                            background: p.colorDim,
                            color: p.color,
                            border: `1px solid ${p.colorBorder}`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {p.flagship && (
                      <div
                        className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at top right, ${p.colorDim}, transparent 70%)`,
                        }}
                      />
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
