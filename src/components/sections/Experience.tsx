"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";
import SectionHeader from "@/components/ui/SectionHeader";
import { experiences } from "@/data/experience";

const TYPE_COLORS = {
  internship: tokens.colors.accentGreen,
  job: tokens.colors.accentPurple,
  freelance: tokens.colors.accentAmber,
};

const TYPE_LABELS = {
  internship: "Internship",
  job: "Full Time",
  freelance: "Freelance",
};

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="section-wrapper"
      aria-labelledby="experience-heading"
    >
      <SectionHeader
        tag="Career"
        title="Professional"
        titleAccent="Journey"
        description="Building expertise through diverse and meaningful experiences."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: tokens.spacing.xxl,
          alignItems: "start",
        }}
        className="experience-grid"
      >
        {/* Left — Timeline */}
        <div style={{ position: "relative", paddingLeft: "32px" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "9px",
              top: "8px",
              bottom: "8px",
              width: "1px",
              background: `linear-gradient(to bottom, ${tokens.colors.accentGreen}, ${tokens.colors.accentPurple}, transparent)`,
            }}
            aria-hidden="true"
          />

          {experiences.map((exp, i) => {
            const color = TYPE_COLORS[exp.type];
            return (
              <motion.div
                key={exp.id}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.12, ease: "easeOut" }}
                style={{
                  position: "relative",
                  paddingLeft: "32px",
                  marginBottom: i < experiences.length - 1 ? tokens.spacing.xxl : 0,
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-23px",
                    top: "6px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: color,
                    boxShadow: `0 0 0 3px var(--color-bg-primary), 0 0 14px ${color}`,
                  }}
                  aria-hidden="true"
                />

                {/* Date badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: tokens.spacing.sm,
                    padding: "3px 10px",
                    background: `color-mix(in srgb, ${color} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
                    borderRadius: tokens.radius.full,
                    fontSize: "11px",
                    fontWeight: 700,
                    color: color,
                    letterSpacing: "0.04em",
                    marginBottom: tokens.spacing.md,
                  }}
                >
                  {exp.period}
                </div>

                {/* Role */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: tokens.font.lg,
                    fontWeight: 700,
                    color: tokens.colors.textPrimary,
                    marginBottom: "4px",
                  }}
                >
                  {exp.role}
                </h3>

                {/* Company */}
                <p
                  style={{
                    fontSize: tokens.font.md,
                    color: tokens.colors.accentPurple,
                    fontWeight: 500,
                    marginBottom: tokens.spacing.md,
                  }}
                >
                  {exp.company}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: tokens.font.sm,
                    color: tokens.colors.textMuted,
                    lineHeight: 1.75,
                  }}
                >
                  {exp.description}
                </p>

                {/* Type badge */}
                <div
                  style={{
                    display: "inline-flex",
                    marginTop: tokens.spacing.md,
                    padding: "3px 10px",
                    background: `color-mix(in srgb, ${color} 8%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
                    borderRadius: tokens.radius.full,
                    fontSize: "10px",
                    fontWeight: 700,
                    color: color,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {TYPE_LABELS[exp.type]}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right — Stats + education */}
        <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacing.xl }}>
          {/* Stats cards */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: tokens.spacing.md,
            }}
          >
            {[
              { num: "3",    label: "Internships",    color: tokens.colors.accentGreen },
              { num: "2+",   label: "Years Learning", color: tokens.colors.accentPurple },
              { num: "5+",   label: "Projects Built", color: tokens.colors.accentPink },
              { num: "10+",  label: "Technologies",   color: tokens.colors.accentAmber },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: tokens.colors.bgCard,
                  border: `1px solid ${tokens.colors.borderPrimary}`,
                  borderRadius: tokens.radius.md,
                  padding: tokens.spacing.xl,
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: "2px",
                    background: stat.color,
                  }}
                />
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: tokens.font.xxl,
                    fontWeight: 800,
                    color: stat.color,
                    lineHeight: 1,
                    marginBottom: tokens.spacing.sm,
                  }}
                >
                  {stat.num}
                </span>
                <span
                  style={{
                    fontSize: tokens.font.xs,
                    color: tokens.colors.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Education card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: tokens.colors.bgCard,
              border: `1px solid ${tokens.colors.borderPrimary}`,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.xl,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${tokens.colors.accentGreen}, transparent)`,
              }}
            />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: tokens.font.lg,
                fontWeight: 700,
                color: tokens.colors.textPrimary,
                marginBottom: tokens.spacing.xl,
                display: "flex",
                alignItems: "center",
                gap: tokens.spacing.sm,
              }}
            >
              🎓 Education
            </h3>

            {[
              {
                degree: "BE — Computer Science & Engineering",
                school: "KLE Technological University",
                period: "2022 – 2026",
                color: tokens.colors.accentGreen,
              },
              {
                degree: "Diploma — Computer Science & Engineering",
                school: "Government Polytechnic",
                period: "2019 – 2022",
                color: tokens.colors.accentPurple,
              },
            ].map((edu, i) => (
              <div
                key={i}
                style={{
                  paddingBottom: i === 0 ? tokens.spacing.xl : 0,
                  borderBottom: i === 0 ? `1px solid ${tokens.colors.borderPrimary}` : "none",
                  marginBottom: i === 0 ? tokens.spacing.xl : 0,
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    background: `color-mix(in srgb, ${edu.color} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${edu.color} 25%, transparent)`,
                    borderRadius: tokens.radius.full,
                    fontSize: "10px",
                    fontWeight: 700,
                    color: edu.color,
                    marginBottom: tokens.spacing.sm,
                  }}
                >
                  {edu.period}
                </div>
                <p
                  style={{
                    fontSize: tokens.font.md,
                    fontWeight: 700,
                    color: tokens.colors.textPrimary,
                    marginBottom: "4px",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {edu.degree}
                </p>
                <p
                  style={{
                    fontSize: tokens.font.sm,
                    color: tokens.colors.textMuted,
                  }}
                >
                  {edu.school}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .experience-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}