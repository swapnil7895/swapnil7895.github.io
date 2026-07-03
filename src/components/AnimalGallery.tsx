"use client";

import { motion } from "framer-motion";

const POLAROIDS = [
  { caption: "Volunteering with RESQ — street rescue, Pune", rotate: "-5deg", top: "0px", image: "/images/resq/IMG20241006134014 (1).jpg" },
  { caption: "RESQ Pune — weekend clinic volunteer", rotate: "3deg", top: "20px", image: "/images/resq/IMG20241006163420 (2).jpg" },
  { caption: "Field rescue operations — RESQ Pune", rotate: "-2deg", top: "8px", image: "/images/resq/IMG20241208164552 (1) (1).jpg" },
  { caption: "Post-surgery care — RESQ Charitable Trust", rotate: "5deg", top: "14px", image: "/images/resq/IMG_20241007_161116 (1).jpg" },
];

export default function AnimalGallery() {
  return (
    <section id="beyond" style={{ background: "var(--surface)", padding: "120px 0", overflow: "hidden" }}>
      <div className="section-inner">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="eyebrow mb-5" style={{ color: "#fb7185" }}>Beyond the Code</p>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 3.75rem)", fontWeight: 800, color: "var(--text)" }}>
            RESQ Volunteering
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem", marginTop: "16px", maxWidth: "480px", margin: "16px auto 0" }}>
            Outside of engineering, I volunteer with{" "}
            <span style={{ color: "#fb7185", fontWeight: 600 }}>RESQ Charitable Trust</span>
            {" "}— Pune&apos;s largest animal rescue organisation.
          </p>
        </motion.div>

        {/* Polaroid fan */}
        <div className="flex flex-wrap md:flex-nowrap justify-center items-start relative min-h-[320px] gap-6 md:gap-0">
          {POLAROIDS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                rotate: "0deg",
                scale: 1.12,
                y: -20,
                zIndex: 50,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="md:-ml-8 relative cursor-pointer"
              style={{
                rotate: photo.rotate,
                top: photo.top,
              }}
            >
              <div style={{
                background: "#fff",
                padding: "12px 12px 44px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                width: "160px",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={photo.image} 
                  alt={photo.caption} 
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    display: "block"
                  }} 
                />
                <p style={{
                  marginTop: "10px",
                  fontSize: "11px",
                  lineHeight: 1.4,
                  color: "#374151",
                  textAlign: "center",
                  fontStyle: "italic",
                  fontFamily: "Georgia, serif",
                }}>
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
