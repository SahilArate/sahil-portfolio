"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import type { ContactFormData, ApiResponse } from "@/types";

type FormStatus = "idle" | "loading" | "success" | "error";

const PROJECT_TYPES = [
  "Web Application",
  "Mobile App",
  "E-commerce",
  "AI/ML Integration",
  "Cloud Solutions",
  "Consultation",
  "Other",
];

const CONTACT_INFO = [
  {
    icon: "✉",
    label: "Email",
    value: "sahilarate5@gmail.com",
    href: "mailto:sahilarate5@gmail.com",
    color: tokens.colors.accentGreen,
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+91 9108696287",
    href: "tel:+919108696287",
    color: tokens.colors.accentPurple,
  },
  {
    icon: "📍",
    label: "Location",
    value: "Belgaum, Karnataka, India",
    href: null,
    color: tokens.colors.accentPink,
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "linkedin.com/in/sahil-arate",
    href: "https://www.linkedin.com/in/sahil-arate-ba9a14254/",
    color: tokens.colors.accentAmber,
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 15px",
  background: "rgba(255,255,255,0.03)",
  border: `1px solid ${tokens.colors.borderPrimary}`,
  borderRadius: tokens.radius.md,
  color: tokens.colors.textPrimary,
  fontFamily: "var(--font-body)",
  fontSize: tokens.font.md,
  outline: "none",
  transition: `all ${tokens.transition.base}`,
  appearance: "none" as const,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: tokens.spacing.sm,
  fontSize: tokens.font.sm,
  fontWeight: 600,
  color: tokens.colors.textSecondary,
  letterSpacing: "0.02em",
};

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    projectType: PROJECT_TYPES[0],
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: ApiResponse = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", projectType: PROJECT_TYPES[0], message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="section-wrapper"
      aria-labelledby="contact-heading"
    >
      <SectionHeader
        tag="Connect"
        title="Let's Work"
        titleAccent="Together"
        description="Ready to bring your ideas to life? Let's talk about your next project."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: tokens.spacing.xxl,
          alignItems: "start",
        }}
        className="contact-grid"
      >
        {/* Left — Contact info */}
        <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacing.xl }}>
          {/* Info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacing.md }}>
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={info.label}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.spacing.lg,
                  padding: tokens.spacing.lg,
                  background: tokens.colors.bgCard,
                  border: `1px solid ${tokens.colors.borderPrimary}`,
                  borderRadius: tokens.radius.md,
                  transition: `border-color ${tokens.transition.base}`,
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: tokens.radius.md,
                    background: `color-mix(in srgb, ${info.color} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${info.color} 25%, transparent)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    flexShrink: 0,
                    color: info.color,
                    fontWeight: 700,
                  }}
                  aria-hidden="true"
                >
                  {info.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: tokens.font.xs,
                      color: tokens.colors.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      fontWeight: 600,
                      marginBottom: "2px",
                    }}
                  >
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        fontSize: tokens.font.sm,
                        color: tokens.colors.textSecondary,
                        textDecoration: "none",
                        transition: `color ${tokens.transition.base}`,
                        fontWeight: 500,
                      }}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p
                      style={{
                        fontSize: tokens.font.sm,
                        color: tokens.colors.textSecondary,
                        fontWeight: 500,
                      }}
                    >
                      {info.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Availability card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{
              padding: tokens.spacing.xl,
              background: `color-mix(in srgb, ${tokens.colors.accentGreen} 8%, transparent)`,
              border: `1px solid ${tokens.colors.borderAccent}`,
              borderRadius: tokens.radius.lg,
              display: "flex",
              alignItems: "center",
              gap: tokens.spacing.lg,
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: tokens.colors.accentGreen,
                boxShadow: `0 0 10px ${tokens.colors.accentGreen}`,
                animation: "blink 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  fontSize: tokens.font.sm,
                  fontWeight: 700,
                  color: tokens.colors.accentGreen,
                  fontFamily: "var(--font-display)",
                  marginBottom: "2px",
                }}
              >
                Available for opportunities
              </p>
              <p style={{ fontSize: tokens.font.xs, color: tokens.colors.textMuted }}>
                Open to internships, full-time roles and freelance projects
              </p>
            </div>
            <style>{`
              @keyframes blink {
                0%,100%{opacity:1;transform:scale(1)}
                50%{opacity:0.4;transform:scale(0.8)}
              }
            `}</style>
          </motion.div>
        </div>

        {/* Right — Contact form */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          style={{
            background: tokens.colors.bgCard,
            border: `1px solid ${tokens.colors.borderPrimary}`,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.xxl,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent */}
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
              fontSize: tokens.font.xl,
              fontWeight: 800,
              color: tokens.colors.textPrimary,
              marginBottom: tokens.spacing.xxl,
              letterSpacing: "-0.02em",
            }}
          >
            Send a Message
          </h3>

          {/* Success state */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: "center",
                padding: tokens.spacing.xxl,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: tokens.spacing.lg,
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: `color-mix(in srgb, ${tokens.colors.accentGreen} 12%, transparent)`,
                  border: `1px solid ${tokens.colors.borderAccent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8rem",
                }}
              >
                ✓
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: tokens.font.xl,
                    fontWeight: 800,
                    color: tokens.colors.accentGreen,
                    marginBottom: tokens.spacing.sm,
                  }}
                >
                  Message Sent!
                </p>
                <p style={{ fontSize: tokens.font.sm, color: tokens.colors.textMuted }}>
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
              <Button onClick={() => setStatus("idle")} variant="secondary" size="sm">
                Send another →
              </Button>
            </motion.div>
          )}

          {/* Form */}
          {status !== "success" && (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacing.lg }}>
                {/* Name + Email row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: tokens.spacing.lg,
                  }}
                  className="form-row"
                >
                  <div>
                    <label htmlFor="name" style={labelStyle}>Your Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      style={inputStyle}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                {/* Project type */}
                <div>
                  <label htmlFor="projectType" style={labelStyle}>Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    style={{ ...inputStyle, color: tokens.colors.textPrimary }}
                    disabled={status === "loading"}
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} style={{ background: "#101018" }}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                    disabled={status === "loading"}
                  />
                </div>

                {/* Error message */}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    style={{
                      fontSize: tokens.font.sm,
                      color: tokens.colors.accentPink,
                      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
                      background: `color-mix(in srgb, ${tokens.colors.accentPink} 8%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${tokens.colors.accentPink} 25%, transparent)`,
                      borderRadius: tokens.radius.md,
                    }}
                  >
                    ⚠️ {errorMsg}
                  </motion.p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: status === "loading"
                      ? tokens.colors.textMuted
                      : tokens.colors.accentGreen,
                    color: "#060608",
                    border: "none",
                    borderRadius: tokens.radius.md,
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: tokens.font.md,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    transition: `all ${tokens.transition.base}`,
                    boxShadow: status === "loading"
                      ? "none"
                      : `0 0 28px color-mix(in srgb, ${tokens.colors.accentGreen} 25%, transparent)`,
                  }}
                >
                  {status === "loading" ? "Sending..." : "Send Message →"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}