"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";

const LINKS = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog",       href: "#blog" },
  { label: "Contact",    href: "#contact" },
];

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/SahilArate",                       icon: "⌥" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sahil-arate-ba9a14254/",  icon: "in" },
  { label: "Email",    href: "mailto:sahilarate5@gmail.com",                         icon: "✉" },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: `1px solid ${tokens.colors.borderPrimary}`,
        background: tokens.colors.bgSecondary,
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Site footer"
    >
      {/* Subtle glow at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "400px",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${tokens.colors.accentGreen}, transparent)`,
        }}
        aria-hidden="true"
      />

      <div
        className="section-wrapper"
        style={{ paddingBlock: tokens.spacing.xxl }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: tokens.spacing.xxl,
            marginBottom: tokens.spacing.xxl,
            flexWrap: "wrap",
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: "280px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: tokens.spacing.sm,
                marginBottom: tokens.spacing.lg,
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: tokens.radius.md,
                  background: tokens.colors.accentGreen,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="2.5" fill="#060608" />
                  <circle cx="8" cy="2.5" r="1.5" fill="#060608" opacity="0.7" />
                  <circle cx="8" cy="13.5" r="1.5" fill="#060608" opacity="0.7" />
                  <circle cx="2.5" cy="8" r="1.5" fill="#060608" opacity="0.7" />
                  <circle cx="13.5" cy="8" r="1.5" fill="#060608" opacity="0.7" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: tokens.font.lg,
                  fontWeight: 800,
                  color: tokens.colors.textPrimary,
                  letterSpacing: "-0.02em",
                }}
              >
                Sahil Arate
              </span>
            </div>
            <p
              style={{
                fontSize: tokens.font.sm,
                color: tokens.colors.textMuted,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Full Stack Developer building fast, accessible and beautifully designed web applications.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <p
              style={{
                fontSize: tokens.font.xs,
                fontWeight: 700,
                color: tokens.colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: tokens.spacing.lg,
              }}
            >
              Navigation
            </p>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
              }}
            >
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    style={{
                      fontSize: tokens.font.sm,
                      color: tokens.colors.textMuted,
                      textDecoration: "none",
                      transition: `color ${tokens.transition.base}`,
                      fontWeight: 500,
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <p
              style={{
                fontSize: tokens.font.xs,
                fontWeight: 700,
                color: tokens.colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: tokens.spacing.lg,
              }}
            >
              Connect
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: tokens.spacing.md,
              }}
            >
              {SOCIALS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: tokens.spacing.md,
                    textDecoration: "none",
                    color: tokens.colors.textMuted,
                    fontSize: tokens.font.sm,
                    fontWeight: 500,
                    transition: `color ${tokens.transition.base}`,
                  }}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: tokens.radius.sm,
                      background: tokens.colors.bgCard,
                      border: `1px solid ${tokens.colors.borderPrimary}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: tokens.colors.textSecondary,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {social.icon}
                  </span>
                  {social.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: tokens.colors.borderPrimary,
            marginBottom: tokens.spacing.xl,
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: tokens.spacing.md,
          }}
        >
          <p
            style={{
              fontSize: tokens.font.xs,
              color: tokens.colors.textMuted,
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Sahil Arate. Built with Next.js & Framer Motion.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: tokens.spacing.sm,
              padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
              background: tokens.colors.bgCard,
              border: `1px solid ${tokens.colors.borderPrimary}`,
              borderRadius: tokens.radius.full,
              color: tokens.colors.textMuted,
              fontSize: tokens.font.xs,
              fontWeight: 600,
              cursor: "pointer",
              transition: `all ${tokens.transition.base}`,
            }}
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}