"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Image from "next/image";

const ABOUT_CARDS = [
  {
    icon: "🚀",
    title: "My Journey",
    body: "I began with a Diploma in Computer Science and Engineering after 10th, and later pursued a BE in CSE to strengthen my foundation. Along the way I grew into a Full Stack Developer with expertise in modern web technologies and cloud computing.",
    accent: "#63ffb4",
  },
  {
    icon: "💡",
    title: "Philosophy",
    body: "Technology is not just about writing code — it's about creating solutions that make life simpler and smarter. My philosophy is to keep learning, keep building, and use my skills to bring meaningful impact through innovation.",
    accent: "#a78bfa",
  },
  {
    icon: "🎯",
    title: "Goals",
    body: "My goal is to grow as a skilled Full Stack Developer while sharpening problem-solving skills through Java DSA. I aspire to build innovative solutions using modern technologies and cloud computing that make a real-world impact.",
    accent: "#f472b6",
  },
];

const QUICK_FACTS = [
  { label: "Location",   value: "Belgaum, Karnataka, India" },
  { label: "Degree",     value: "BE in Computer Science" },
  { label: "Focus",      value: "Full Stack + Cloud" },
  { label: "Status",     value: "Open to opportunities" },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="about"
      className="section-wrapper"
      aria-labelledby="about-heading"
    >
      <SectionHeader
        tag="Who I Am"
        title="About"
        titleAccent="Me"
        description="Passionate developer with a keen eye for design and innovation."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: tokens.spacing.xxl,
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left — cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: tokens.spacing.lg,
          }}
        >
          {ABOUT_CARDS.map((card, i) => (
            <Card
              key={card.title}
              accentColor={card.accent}
              delay={i * 0.1}
              padding={tokens.spacing.xl}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: tokens.spacing.lg,
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: tokens.radius.md,
                    background: `color-mix(in srgb, ${card.accent} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${card.accent} 25%, transparent)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {card.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: tokens.font.lg,
                      fontWeight: 700,
                      color: tokens.colors.textPrimary,
                      marginBottom: tokens.spacing.sm,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: tokens.font.md,
                      color: tokens.colors.textMuted,
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Right — quick facts + image placeholder */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: tokens.spacing.xl,
          }}
        >
          {/* Avatar */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "relative",
              width: "200px",
              height: "200px",
              margin: "0 auto",
            }}
          >
            {/* Spinning gradient ring */}
            <div
              style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "50%",
                background: `conic-gradient(from 0deg, ${tokens.colors.accentGreen}, ${tokens.colors.accentPurple}, ${tokens.colors.accentPink}, ${tokens.colors.accentGreen})`,
                animation: shouldReduceMotion ? "none" : "spin 6s linear infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "-20px",
                borderRadius: "50%",
                background: `radial-gradient(circle, color-mix(in srgb, ${tokens.colors.accentGreen} 18%, transparent) 0%, transparent 70%)`,
                animation: shouldReduceMotion ? "none" : "pulse 3s ease-in-out infinite",
              }}
            />
            <Image
            src="/sahilarate.jpeg"
            alt="Sahil Arate"
            width={200}
            height={200}
            style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                objectFit: "cover",
                position: "relative",
                zIndex: 1,
                border: `3px solid var(--color-bg-primary)`,
            }}
            priority
            />
            <style>{`
              @keyframes spin { to { transform: rotate(360deg); } }
              @keyframes pulse {
                0%,100%{opacity:0.6;transform:scale(1)}
                50%{opacity:1;transform:scale(1.1)}
              }
            `}</style>
          </motion.div>

          {/* Quick facts */}
          <Card accentColor={tokens.colors.accentGreen} delay={0.2}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: tokens.font.lg,
                fontWeight: 700,
                color: tokens.colors.textPrimary,
                marginBottom: tokens.spacing.lg,
              }}
            >
              Quick Facts
            </h3>
            <motion.ul
              variants={shouldReduceMotion ? undefined : listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: tokens.spacing.md,
              }}
            >
              {QUICK_FACTS.map((fact) => (
                <motion.li
                  key={fact.label}
                  variants={shouldReduceMotion ? undefined : listItemVariants}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: tokens.spacing.md,
                    borderBottom: `1px solid ${tokens.colors.borderPrimary}`,
                    gap: tokens.spacing.md,
                  }}
                >
                  <span
                    style={{
                      fontSize: tokens.font.sm,
                      color: tokens.colors.textMuted,
                      fontWeight: 500,
                    }}
                  >
                    {fact.label}
                  </span>
                  <span
                    style={{
                      fontSize: tokens.font.sm,
                      color: tokens.colors.textPrimary,
                      fontWeight: 600,
                      textAlign: "right",
                    }}
                  >
                    {fact.value}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </Card>

          {/* Social links */}
          <div style={{ display: "flex", gap: tokens.spacing.md }}>
            {[
              { label: "GitHub",   href: "https://github.com/SahilArate",                          icon: "⌥" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/sahil-arate-ba9a14254/",     icon: "in" },
              { label: "Email",    href: "mailto:sahilarate5@gmail.com",                            icon: "✉" },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.05 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.spacing.sm,
                  padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
                  background: tokens.colors.bgCard,
                  border: `1px solid ${tokens.colors.borderPrimary}`,
                  borderRadius: tokens.radius.full,
                  textDecoration: "none",
                  fontSize: tokens.font.sm,
                  fontWeight: 600,
                  color: tokens.colors.textSecondary,
                  transition: `all ${tokens.transition.base}`,
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <span aria-hidden="true">{link.icon}</span>
                <span>{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}