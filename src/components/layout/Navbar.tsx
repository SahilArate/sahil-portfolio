"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useActiveSection } from "@/hooks/useActiveSection";
import { tokens } from "@/tokens";

const NAV_ITEMS = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog",       href: "#blog" },
  { label: "Contact",    href: "#contact" },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace("#", ""));

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleThemeToggle = () => {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sahil-theme", next);
  };

  const bgColor = isDark ? "rgba(10,10,16,0.92)" : "rgba(255,255,255,0.92)";
  const mobileBg = isDark ? "rgba(10,10,16,0.95)" : "rgba(255,255,255,0.95)";

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          width: "calc(100% - 48px)",
          maxWidth: "1000px",
        }}
      >
        <div
          style={{
            background: scrolled ? bgColor : "transparent",
            backdropFilter: scrolled ? "blur(28px)" : "none",
            border: `1px solid ${scrolled ? tokens.colors.borderPrimary : "transparent"}`,
            borderRadius: tokens.radius.full,
            padding: "6px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: `all ${tokens.transition.slow}`,
            boxShadow: scrolled ? "0 8px 48px rgba(0,0,0,0.4)" : "none",
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: tokens.spacing.sm,
              textDecoration: "none",
              padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
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
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="2.5" fill={isDark ? "#060608" : "#ffffff"} />
                <circle cx="8" cy="2.5" r="1.5" fill={isDark ? "#060608" : "#ffffff"} opacity="0.7" />
                <circle cx="8" cy="13.5" r="1.5" fill={isDark ? "#060608" : "#ffffff"} opacity="0.7" />
                <circle cx="2.5" cy="8" r="1.5" fill={isDark ? "#060608" : "#ffffff"} opacity="0.7" />
                <circle cx="13.5" cy="8" r="1.5" fill={isDark ? "#060608" : "#ffffff"} opacity="0.7" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: tokens.font.md,
                fontWeight: 800,
                color: tokens.colors.textPrimary,
                letterSpacing: "-0.02em",
              }}
            >
              sahil
            </span>
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="desktop-nav">
            <ul
              className="nav-list"
              style={{
                display: "flex",
                listStyle: "none",
                gap: "2px",
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                const activeColor = isDark ? "#060608" : "#ffffff";
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="nav-link"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      style={{
                        display: "block",
                        padding: "9px 10px",
                        borderRadius: tokens.radius.full,
                        fontFamily: "var(--font-display)",
                        fontSize: "13px",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        textDecoration: "none",
                        color: isActive ? activeColor : tokens.colors.textMuted,
                        background: isActive ? tokens.colors.accentGreen : "transparent",
                        transition: `all ${tokens.transition.base}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: tokens.spacing.sm }}>
            <button
              onClick={handleThemeToggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: tokens.spacing.sm,
                padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                background: "transparent",
                border: `1px solid ${tokens.colors.borderPrimary}`,
                borderRadius: tokens.radius.full,
                color: tokens.colors.textSecondary,
                fontSize: tokens.font.sm,
                fontWeight: 500,
                transition: `all ${tokens.transition.base}`,
              }}
            >
              <span style={{ fontSize: "14px" }}>{isDark ? "☀️" : "🌙"}</span>
              <span className="theme-label">{isDark ? "Light" : "Dark"}</span>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="mobile-menu-btn"
              style={{
                display: "none",
                width: "36px",
                height: "36px",
                borderRadius: tokens.radius.md,
                border: `1px solid ${tokens.colors.borderPrimary}`,
                background: "transparent",
                color: tokens.colors.textPrimary,
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                marginTop: tokens.spacing.sm,
                background: mobileBg,
                backdropFilter: "blur(28px)",
                border: `1px solid ${tokens.colors.borderPrimary}`,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    style={{
                      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
                      borderRadius: tokens.radius.md,
                      fontFamily: "var(--font-display)",
                      fontSize: tokens.font.md,
                      fontWeight: 600,
                      textDecoration: "none",
                      color: isActive
                        ? tokens.colors.accentGreen
                        : tokens.colors.textSecondary,
                      transition: `all ${tokens.transition.fast}`,
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .theme-label { display: none; }
        }
      `}</style>
    </>
  );
}