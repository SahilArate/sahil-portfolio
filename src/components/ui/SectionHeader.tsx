"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";

interface SectionHeaderProps {
  tag: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  tag,
  title,
  titleAccent,
  description,
  align = "left",
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacing.md,
        textAlign: align,
        alignItems: align === "center" ? "center" : "flex-start",
        marginBottom: tokens.spacing.xxl,
      }}
    >
      {/* Tag */}
      <motion.span
        variants={shouldReduceMotion ? undefined : itemVariants}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: tokens.spacing.sm,
          fontSize: tokens.font.xs,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: tokens.colors.accentGreen,
        }}
      >
        <span
          style={{
            width: "24px",
            height: "1px",
            background: tokens.colors.accentGreen,
            display: "inline-block",
          }}
        />
        {tag}
        <span
          style={{
            width: "24px",
            height: "1px",
            background: tokens.colors.accentGreen,
            display: align === "center" ? "inline-block" : "none",
          }}
        />
      </motion.span>

      {/* Title */}
      <motion.h2
        variants={shouldReduceMotion ? undefined : itemVariants}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: tokens.font.xxl,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: tokens.colors.textPrimary,
          margin: 0,
        }}
      >
        {title}{" "}
        {titleAccent && (
          <span
            style={{
              background: `linear-gradient(135deg, ${tokens.colors.accentGreen}, ${tokens.colors.accentPurple})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {titleAccent}
          </span>
        )}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          variants={shouldReduceMotion ? undefined : itemVariants}
          style={{
            fontSize: tokens.font.lg,
            color: tokens.colors.textMuted,
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: 0,
          }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}