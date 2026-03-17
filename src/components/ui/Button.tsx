"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  ariaLabel?: string;
  target?: string;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: tokens.colors.accentGreen,
    color: "var(--btn-text, #060608)",
    border: "none",
    boxShadow: `0 0 32px color-mix(in srgb, ${tokens.colors.accentGreen} 30%, transparent)`,
  },
  secondary: {
    background: "transparent",
    color: tokens.colors.textPrimary,
    border: `1px solid ${tokens.colors.borderPrimary}`,
  },
  ghost: {
    background: "transparent",
    color: tokens.colors.textSecondary,
    border: "1px solid transparent",
  },
  danger: {
    background: "color-mix(in srgb, var(--color-accent-pink) 12%, transparent)",
    color: tokens.colors.accentPink,
    border: `1px solid color-mix(in srgb, var(--color-accent-pink) 30%, transparent)`,
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    fontSize: tokens.font.sm,
  },
  md: {
    padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
    fontSize: tokens.font.md,
  },
  lg: {
    padding: `${tokens.spacing.lg} ${tokens.spacing.xxl}`,
    fontSize: tokens.font.lg,
  },
};

export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  fullWidth = false,
  icon,
  ariaLabel,
  target,
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseStyle: React.CSSProperties = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing.sm,
    borderRadius: tokens.radius.full,
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    letterSpacing: "0.01em",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: `all ${tokens.transition.base}`,
    textDecoration: "none",
    width: fullWidth ? "100%" : "auto",
    whiteSpace: "nowrap",
  };

  const hoverStyle = shouldReduceMotion
    ? {}
    : {
        scale: 1.03,
        y: -2,
        transition: { duration: 0.15 },
      };

  const tapStyle = shouldReduceMotion ? {} : { scale: 0.97 };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        style={baseStyle}
        whileHover={disabled ? undefined : hoverStyle}
        whileTap={disabled ? undefined : tapStyle}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={baseStyle}
      whileHover={disabled ? undefined : hoverStyle}
      whileTap={disabled ? undefined : tapStyle}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </motion.button>
  );
}