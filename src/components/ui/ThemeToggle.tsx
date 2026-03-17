"use client";

import { useCallback, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";
import type { Theme } from "@/types";

function getSnapshot(): Theme {
  return (document.documentElement.getAttribute("data-theme") as Theme) ?? "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export default function ThemeToggle() {
  const shouldReduceMotion = useReducedMotion();
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggle = useCallback(() => {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sahil-theme", next);
  }, [isDark]);

  return (
    <button
      onClick={toggle}
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
      <motion.span
        key={isDark ? "sun" : "moon"}
        initial={shouldReduceMotion ? false : { opacity: 0, rotate: -30, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ display: "inline-flex", fontSize: "14px" }}
        aria-hidden="true"
      >
        {isDark ? "☀️" : "🌙"}
      </motion.span>
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}