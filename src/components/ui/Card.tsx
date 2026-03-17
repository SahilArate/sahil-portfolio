"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  hoverable?: boolean;
  delay?: number;
  padding?: string;
  onClick?: () => void;
  role?: string;
  ariaLabel?: string;
}

export default function Card({
  children,
  accentColor,
  hoverable = true,
  delay = 0,
  padding,
  onClick,
  role,
  ariaLabel,
}: CardProps) {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut" as const,
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={
        hoverable && !shouldReduceMotion
          ? { y: -4, transition: { duration: 0.2 } }
          : undefined
      }
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      className="card-container"
      style={{
        background: tokens.colors.bgCard,
        border: `1px solid ${tokens.colors.borderPrimary}`,
        borderRadius: tokens.radius.lg,
        padding: padding ?? tokens.spacing.xl,
        position: "relative",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transition: `border-color ${tokens.transition.base}, box-shadow ${tokens.transition.base}`,
      }}
    >
      {/* Top accent line — animates in on hover via CSS */}
      <div
        className="card-accent-line"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: accentColor
            ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
            : `linear-gradient(90deg, transparent, ${tokens.colors.accentGreen}, transparent)`,
          transformOrigin: "left",
        }}
      />

      {/* Corner glow on hover */}
      {accentColor && (
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
            pointerEvents: "none",
            transition: `opacity ${tokens.transition.base}`,
          }}
        />
      )}

      {children}
    </motion.div>
  );
}