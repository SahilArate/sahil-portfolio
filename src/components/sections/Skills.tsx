"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";
import SectionHeader from "@/components/ui/SectionHeader";
import { skills, skillCategories } from "@/data/skills";
import type { SkillCategoryFilter } from "@/data/skills";

function useCountUp(target: number, duration: number = 1000, shouldStart: boolean = false) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, shouldStart]);
  return current;
}

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animatedCost = useCountUp(skill.pct, 1000, isVisible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delay = (index * 0.045).toFixed(2);
  const circumference = 113;
  const offset = circumference - (circumference * skill.pct) / 100;
  const iconBg = skill.color + "18";

  const levelColor = {
    Expert: tokens.colors.accentGreen,
    Advanced: tokens.colors.accentPurple,
    Proficient: tokens.colors.accentAmber,
  }[skill.level];

  const levelBg = {
    Expert: "rgba(99,255,180,0.08)",
    Advanced: "rgba(167,139,250,0.08)",
    Proficient: "rgba(251,191,36,0.08)",
  }[skill.level];

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: Number(delay), ease: "easeOut" }}
      whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
      style={{
        background: tokens.colors.bgCard,
        border: `1px solid ${tokens.colors.borderPrimary}`,
        borderRadius: tokens.radius.lg,
        padding: "20px 18px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        position: "relative",
        overflow: "hidden",
        transition: `border-color ${tokens.transition.base}, box-shadow ${tokens.transition.base}`,
      }}
    >
      {/* Glow corner */}
      <div
        style={{
          position: "absolute",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${skill.color} 0%, transparent 70%)`,
          top: "-30px",
          right: "-30px",
          opacity: 0.2,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* Top row — icon + ring */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: iconBg,
            border: `1px solid ${skill.color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {skill.icon}
        </div>

        {/* SVG ring */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 40 40"
          aria-label={`${skill.name} proficiency: ${skill.pct}%`}
          role="img"
        >
          <circle
            cx="20" cy="20" r="18"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="3"
          />
          <circle
            cx="20" cy="20" r="18"
            fill="none"
            stroke={skill.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? offset : circumference}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
              transition: shouldReduceMotion
                ? "none"
                : `stroke-dashoffset 1s ease-out ${delay}s`,
              filter: `drop-shadow(0 0 4px ${skill.color})`,
            }}
          />
          <text
            x="20" y="20"
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "10px",
              fontWeight: 700,
              fill: skill.color,
            }}
          >
            {animatedCost}
          </text>
        </svg>
      </div>

      {/* Skill name */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: tokens.font.md,
          fontWeight: 700,
          color: tokens.colors.textPrimary,
        }}
      >
        {skill.name}
      </div>

      {/* Thin bar */}
      <div
        style={{
          width: "100%",
          height: "3px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: tokens.radius.full,
          overflow: "hidden",
        }}
        role="meter"
        aria-valuenow={skill.pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name}: ${skill.pct}%`}
      >
        <div
          style={{
            height: "100%",
            borderRadius: tokens.radius.full,
            background: `linear-gradient(90deg, ${skill.color}, color-mix(in srgb, ${skill.color} 60%, transparent))`,
            width: isVisible ? `${skill.pct}%` : "0%",
            transition: shouldReduceMotion ? "none" : `width 1s ease-out ${delay}s`,
          }}
        />
      </div>

      {/* Level badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "3px 10px",
          borderRadius: tokens.radius.full,
          background: levelBg,
          border: `1px solid ${levelColor}`,
          fontSize: "10px",
          fontWeight: 700,
          color: levelColor,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          width: "fit-content",
        }}
      >
        {skill.level}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<SkillCategoryFilter>("All");

  const filtered = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const totalSkills = skills.length;
  const avgPct = Math.round(skills.reduce((s, k) => s + k.pct, 0) / skills.length);
  const expertCount = skills.filter((s) => s.level === "Expert").length;
  const topSkill = skills.reduce((a, b) => (a.pct > b.pct ? a : b));

  const summaryCards = [
    { label: "Technologies", value: String(totalSkills), color: tokens.colors.accentGreen },
    { label: "Avg Proficiency", value: `${avgPct}%`,  color: tokens.colors.accentPurple },
    { label: "Top Skill",  value: topSkill.name,        color: tokens.colors.accentPink },
    { label: "Expert Level", value: String(expertCount), color: tokens.colors.accentAmber },
  ];

  return (
    <section
      id="skills"
      className="section-wrapper"
      aria-labelledby="skills-heading"
    >
      <SectionHeader
        tag="Expertise"
        title="Technical"
        titleAccent="Skills"
        description="Tools and technologies I work with every day."
      />

      {/* Summary strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: tokens.spacing.md,
          marginBottom: tokens.spacing.xxl,
        }}
        className="skills-summary-grid"
      >
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            style={{
              background: tokens.colors.bgCard,
              border: `1px solid ${tokens.colors.borderPrimary}`,
              borderRadius: tokens.radius.md,
              padding: tokens.spacing.xl,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: card.color,
              }}
            />
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: tokens.font.xxl,
                fontWeight: 800,
                color: card.color,
                lineHeight: 1,
                marginBottom: tokens.spacing.sm,
              }}
            >
              {card.value}
            </span>
            <span
              style={{
                fontSize: tokens.font.xs,
                color: tokens.colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              {card.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Category tabs */}
      <div
        style={{
          display: "flex",
          gap: tokens.spacing.sm,
          flexWrap: "wrap",
          marginBottom: tokens.spacing.xl,
        }}
        role="tablist"
        aria-label="Skill categories"
      >
        {skillCategories.map((cat) => {
          const count = cat === "All" ? skills.length : skills.filter((s) => s.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
                borderRadius: tokens.radius.full,
                border: `1px solid ${isActive ? tokens.colors.borderAccent : tokens.colors.borderPrimary}`,
                background: isActive
                  ? `color-mix(in srgb, ${tokens.colors.accentGreen} 10%, transparent)`
                  : "transparent",
                color: isActive ? tokens.colors.accentGreen : tokens.colors.textMuted,
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: `all ${tokens.transition.base}`,
                display: "flex",
                alignItems: "center",
                gap: tokens.spacing.sm,
              }}
            >
              {cat}
              <span
                style={{
                  fontSize: "11px",
                  opacity: 0.7,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: tokens.spacing.md,
        }}
        role="tabpanel"
        aria-label={`${activeCategory} skills`}
      >
        {filtered.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-summary-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .skills-summary-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}