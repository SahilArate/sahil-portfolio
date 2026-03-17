"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";
import Button from "@/components/ui/Button";

const ROLES = [
  "Full Stack Developer",
  "Cloud Enthusiast",
  "React Specialist",
  "TypeScript Advocate",
  "UI/UX Thinker",
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setDeleting(false);
          setWordIndex((w) => (w + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

function AmbientOrbs() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {[
        { size: 600, color: "rgba(99,255,180,0.07)", top: "-200px", left: "-150px", delay: "0s" },
        { size: 500, color: "rgba(167,139,250,0.07)", bottom: "-100px", right: "-100px", delay: "-8s" },
        { size: 350, color: "rgba(244,114,182,0.05)", top: "40%", left: "50%", delay: "-15s" },
      ].map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(80px)",
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            animation: `drift 20s ease-in-out infinite`,
            animationDelay: orb.delay,
          }}
        />
      ))}
      <style>{`
        @keyframes drift {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-30px) scale(1.06); }
          66% { transform: translate(-20px,20px) scale(0.94); }
        }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const role = useTypewriter(ROLES, 80, 2000);
  const heroRef = useRef<HTMLElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Hero section"
    >
      <AmbientOrbs />

      <div
        className="section-wrapper"
        style={{ position: "relative", zIndex: 1, width: "100%" }}
      >
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: tokens.spacing.xl,
            maxWidth: "800px",
          }}
        >
          {/* Available badge */}
          <motion.div
            variants={shouldReduceMotion ? undefined : itemVariants}
            style={{ display: "flex" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: tokens.spacing.sm,
                padding: `5px 14px`,
                background: `color-mix(in srgb, ${tokens.colors.accentGreen} 10%, transparent)`,
                border: `1px solid ${tokens.colors.borderAccent}`,
                borderRadius: tokens.radius.full,
                fontSize: tokens.font.xs,
                fontWeight: 700,
                color: tokens.colors.accentGreen,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: tokens.colors.accentGreen,
                  boxShadow: `0 0 10px ${tokens.colors.accentGreen}`,
                  animation: "blink 2s ease-in-out infinite",
                  display: "inline-block",
                }}
              />
              Available for opportunities
            </div>
            <style>{`
              @keyframes blink {
                0%,100%{opacity:1;transform:scale(1)}
                50%{opacity:0.4;transform:scale(0.8)}
              }
            `}</style>
          </motion.div>

          {/* Name */}
          <motion.div variants={shouldReduceMotion ? undefined : itemVariants}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: tokens.font.hero,
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                color: tokens.colors.textPrimary,
                margin: 0,
              }}
            >
              Hi, I&apos;m{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${tokens.colors.accentGreen} 0%, ${tokens.colors.accentPurple} 60%, ${tokens.colors.accentPink} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Sahil Arate
              </span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={shouldReduceMotion ? undefined : itemVariants}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: tokens.font.xl,
                fontWeight: 600,
                color: tokens.colors.textSecondary,
                margin: 0,
                minHeight: "2rem",
              }}
            >
              {shouldReduceMotion ? ROLES[0] : role}
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.2em",
                  background: tokens.colors.accentGreen,
                  marginLeft: "3px",
                  verticalAlign: "middle",
                  animation: "cursor-blink 1s step-end infinite",
                }}
              />
              <style>{`
                @keyframes cursor-blink {
                  0%,100%{opacity:1} 50%{opacity:0}
                }
              `}</style>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={shouldReduceMotion ? undefined : itemVariants}
            style={{
              fontSize: tokens.font.lg,
              color: tokens.colors.textMuted,
              fontWeight: 300,
              lineHeight: 1.8,
              margin: 0,
              maxWidth: "560px",
            }}
          >
            Computer Science engineer from Belgaum, Karnataka.
            I build fast, accessible, and beautifully designed web applications
            using modern technologies and cloud computing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={shouldReduceMotion ? undefined : itemVariants}
            style={{ display: "flex", gap: tokens.spacing.md, flexWrap: "wrap" }}
          >
            <Button
              onClick={() => scrollToSection("projects")}
              variant="primary"
              size="lg"
              icon={<span>→</span>}
            >
              View Projects
            </Button>
            <Button
              href="/resume.pdf"
              target="_blank"
              variant="secondary"
              size="lg"
              icon={<span>↓</span>}
            >
              Download Resume
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="ghost"
              size="lg"
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={shouldReduceMotion ? undefined : itemVariants}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, auto)",
              gap: `1px`,
              background: tokens.colors.borderPrimary,
              borderRadius: tokens.radius.lg,
              overflow: "hidden",
              border: `1px solid ${tokens.colors.borderPrimary}`,
              width: "fit-content",
            }}
          >
            {[
              { num: "3+", label: "Internships" },
              { num: "5+", label: "Projects" },
              { num: "10+", label: "Technologies" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: tokens.colors.bgCard,
                  padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: tokens.font.xxl,
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${tokens.colors.accentGreen}, ${tokens.colors.accentPurple})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.num}
                </span>
                <span
                  style={{
                    fontSize: tokens.font.xs,
                    color: tokens.colors.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={shouldReduceMotion ? undefined : itemVariants}
            style={{
              display: "flex",
              alignItems: "center",
              gap: tokens.spacing.sm,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                animation: shouldReduceMotion ? "none" : "bounce 2s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  width: "1px",
                  height: "40px",
                  background: `linear-gradient(to bottom, ${tokens.colors.accentGreen}, transparent)`,
                }}
              />
              <span style={{ fontSize: "10px" }}>↓</span>
            </div>
            <span
              style={{
                fontSize: tokens.font.xs,
                color: tokens.colors.textMuted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              scroll to explore
            </span>
            <style>{`
              @keyframes bounce {
                0%,100%{transform:translateY(0)}
                50%{transform:translateY(6px)}
              }
            `}</style>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}