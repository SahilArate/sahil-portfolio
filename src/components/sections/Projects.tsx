"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

function TopologyMini() {
  return (
    <div
      style={{ position: "relative", width: "160px", height: "160px", flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* Pulse rings */}
      {[0, 0.8].map((delay, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "80px", height: "80px",
            borderRadius: "50%",
            border: "1px solid rgba(99,255,180,0.2)",
            animation: `topoPulse 2.5s ease-out infinite`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
      {/* Corner nodes */}
      {[
        { top: "8px",  left: "8px",   label: "☁" },
        { top: "8px",  right: "8px",  label: "△" },
        { bottom: "8px", left: "8px", label: "◎" },
        { bottom: "8px", right: "8px",label: "▦" },
      ].map((node, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "34px", height: "34px",
            background: "rgba(16,16,24,0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.85rem",
            animation: "nodePulse 3s ease-in-out infinite",
            animationDelay: `${i * 0.75}s`,
            top: node.top,
            bottom: node.bottom,
            left: node.left,
            right: node.right,
          }}
        >
          {node.label}
        </div>
      ))}
      {/* Center */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "50px", height: "50px",
          background: "rgba(99,255,180,0.1)",
          border: "1px solid rgba(99,255,180,0.3)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.3rem",
          boxShadow: "0 0 24px rgba(99,255,180,0.2)",
          zIndex: 2,
        }}
      >
        ⚡
      </div>
      <style>{`
        @keyframes topoPulse {
          0%{transform:translate(-50%,-50%) scale(0.8);opacity:0.8}
          100%{transform:translate(-50%,-50%) scale(1.8);opacity:0}
        }
        @keyframes nodePulse {
          0%,100%{border-color:rgba(255,255,255,0.08);box-shadow:none}
          50%{border-color:rgba(99,255,180,0.3);box-shadow:0 0 12px rgba(99,255,180,0.2)}
        }
      `}</style>
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
      style={{
        gridColumn: "1 / -1",
        background: tokens.colors.bgCard,
        border: `1px solid ${tokens.colors.borderAccent}`,
        borderRadius: tokens.radius.lg,
        overflow: "hidden",
        position: "relative",
        transition: `box-shadow ${tokens.transition.base}`,
      }}
    >
      {/* Gradient top line */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: `linear-gradient(90deg, ${tokens.colors.accentGreen}, ${tokens.colors.accentPurple}, ${tokens.colors.accentPink})`,
        }}
      />
      <div
        style={{
          padding: tokens.spacing.xxl,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: tokens.spacing.xxl,
          alignItems: "start",
        }}
        className="featured-grid"
      >
        <div>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: tokens.spacing.sm,
              padding: `4px 12px`,
              background: `color-mix(in srgb, ${tokens.colors.accentGreen} 10%, transparent)`,
              border: `1px solid ${tokens.colors.borderAccent}`,
              borderRadius: tokens.radius.full,
              fontSize: tokens.font.xs,
              fontWeight: 700,
              color: tokens.colors.accentGreen,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: tokens.spacing.lg,
            }}
          >
            ✦ Latest Project
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: tokens.font.xl,
              fontWeight: 800,
              color: tokens.colors.textPrimary,
              letterSpacing: "-0.02em",
              marginBottom: tokens.spacing.md,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: tokens.font.md,
              color: tokens.colors.textMuted,
              lineHeight: 1.75,
              marginBottom: tokens.spacing.xl,
              maxWidth: "560px",
            }}
          >
            {project.longDescription}
          </p>

          {/* Metrics */}
          {project.metrics && (
            <div
              style={{
                display: "flex",
                gap: tokens.spacing.xl,
                marginBottom: tokens.spacing.xl,
                flexWrap: "wrap",
              }}
            >
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: tokens.font.xl,
                      fontWeight: 800,
                      color: tokens.colors.accentGreen,
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    style={{
                      fontSize: tokens.font.xs,
                      color: tokens.colors.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: tokens.spacing.sm,
              marginBottom: tokens.spacing.xl,
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: `4px 11px`,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${tokens.colors.borderPrimary}`,
                  borderRadius: tokens.radius.full,
                  fontSize: "11px",
                  fontWeight: 500,
                  color: tokens.colors.textDim ?? tokens.colors.textMuted,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: tokens.spacing.md, flexWrap: "wrap" }}>
            {project.liveUrl && (
              <Button href={project.liveUrl} target="_blank" variant="primary" size="sm">
                ↗ Live Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button href={project.githubUrl} target="_blank" variant="secondary" size="sm">
                ⌥ GitHub
              </Button>
            )}
          </div>
        </div>

        {/* Visual */}
        <div className="featured-visual">
          <TopologyMini />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <Card accentColor={project.accentColor} delay={index * 0.1} padding={tokens.spacing.xl}>
      <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacing.lg, height: "100%" }}>
        {/* Top */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div
            style={{
              width: "42px", height: "42px",
              borderRadius: tokens.radius.md,
              background: `color-mix(in srgb, ${project.accentColor} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${project.accentColor} 25%, transparent)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
            }}
            aria-hidden="true"
          >
            {project.icon}
          </div>
          <span
            style={{
              padding: `4px 10px`,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${tokens.colors.borderPrimary}`,
              borderRadius: tokens.radius.full,
              fontSize: "11px",
              fontWeight: 600,
              color: tokens.colors.textMuted,
              fontFamily: "var(--font-display)",
            }}
          >
            {project.tags[0]}
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: tokens.font.lg,
              fontWeight: 700,
              color: tokens.colors.textPrimary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: tokens.font.sm,
              color: tokens.colors.textMuted,
              lineHeight: 1.7,
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 10px",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${tokens.colors.borderPrimary}`,
                borderRadius: tokens.radius.full,
                fontSize: "11px",
                color: tokens.colors.textMuted,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.liveUrl || project.githubUrl) && (
          <div style={{ display: "flex", gap: tokens.spacing.sm }}>
            {project.liveUrl && (
              <Button href={project.liveUrl} target="_blank" variant="primary" size="sm">
                ↗ Live
              </Button>
            )}
            {project.githubUrl && (
              <Button href={project.githubUrl} target="_blank" variant="secondary" size="sm">
                ⌥ Code
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="section-wrapper"
      aria-labelledby="projects-heading"
    >
      <SectionHeader
        tag="Work"
        title="Featured"
        titleAccent="Projects"
        description="Innovative solutions that showcase my passion and expertise."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: tokens.spacing.xl,
        }}
      >
        {/* Featured project */}
        {featured.map((p) => (
          <FeaturedProject key={p.id} project={p} />
        ))}

        {/* Regular project cards */}
        {rest.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
          .featured-visual {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}