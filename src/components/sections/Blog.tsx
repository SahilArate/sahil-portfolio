"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/tokens";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { blogPosts } from "@/data/blog";
import type { BlogPost } from "@/types";

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const tagColors = [
    tokens.colors.accentGreen,
    tokens.colors.accentPurple,
    tokens.colors.accentPink,
    tokens.colors.accentAmber,
  ];

  return (
    <Card accentColor={tagColors[index % tagColors.length]} delay={index * 0.1}>
      <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacing.lg }}>

        {/* Top meta */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: tokens.spacing.sm }}>
          <div style={{ display: "flex", alignItems: "center", gap: tokens.spacing.md }}>
            <span
              style={{
                fontSize: tokens.font.xs,
                color: tokens.colors.textMuted,
                fontWeight: 500,
              }}
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: tokens.colors.textMuted,
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: tokens.font.xs, color: tokens.colors.textMuted }}>
              {post.readTime}
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: tokens.spacing.sm, flexWrap: "wrap" }}>
            {post.tags.slice(0, 2).map((tag, i) => (
              <span
                key={tag}
                style={{
                  padding: "3px 10px",
                  background: `color-mix(in srgb, ${tagColors[i % tagColors.length]} 10%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${tagColors[i % tagColors.length]} 25%, transparent)`,
                  borderRadius: tokens.radius.full,
                  fontSize: "10px",
                  fontWeight: 600,
                  color: tagColors[i % tagColors.length],
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: tokens.font.lg,
            fontWeight: 700,
            color: tokens.colors.textPrimary,
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontSize: tokens.font.sm,
            color: tokens.colors.textMuted,
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {post.excerpt}
        </p>

        {/* Expanded content */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div
            style={{
              paddingTop: tokens.spacing.md,
              borderTop: `1px solid ${tokens.colors.borderPrimary}`,
              fontSize: tokens.font.sm,
              color: tokens.colors.textMuted,
              lineHeight: 1.85,
              whiteSpace: "pre-wrap",
            }}
          >
            {post.content.trim()}
          </div>
        </motion.div>

        {/* Read more button */}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: tokens.spacing.sm,
            background: "transparent",
            border: "none",
            color: tagColors[index % tagColors.length],
            fontSize: tokens.font.sm,
            fontWeight: 600,
            cursor: "pointer",
            padding: 0,
            fontFamily: "var(--font-display)",
            transition: `opacity ${tokens.transition.base}`,
            width: "fit-content",
          }}
        >
          <span>{expanded ? "Show less ↑" : "Read more ↓"}</span>
        </button>
      </div>
    </Card>
  );
}

export default function Blog() {
  return (
    <section
      id="blog"
      className="section-wrapper"
      aria-labelledby="blog-heading"
    >
      <SectionHeader
        tag="Writing"
        title="Latest"
        titleAccent="Articles"
        description="Thoughts on development, design, and the things I learn along the way."
      />

      {/* Blog grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: tokens.spacing.xl,
          marginBottom: tokens.spacing.xxl,
        }}
      >
        {blogPosts.map((post, i) => (
          <BlogCard key={post.id} post={post} index={i} />
        ))}
      </div>

      {/* Newsletter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        style={{
          background: tokens.colors.bgCard,
          border: `1px solid ${tokens.colors.borderAccent}`,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.xxl,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient top line */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${tokens.colors.accentGreen}, transparent)`,
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-60px", left: "50%",
            transform: "translateX(-50%)",
            width: "200px", height: "200px",
            borderRadius: "50%",
            background: `radial-gradient(circle, color-mix(in srgb, ${tokens.colors.accentGreen} 12%, transparent) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: tokens.font.xs,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: tokens.colors.accentGreen,
              marginBottom: tokens.spacing.md,
            }}
          >
            Stay Updated
          </span>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: tokens.font.xl,
              fontWeight: 800,
              color: tokens.colors.textPrimary,
              marginBottom: tokens.spacing.md,
              letterSpacing: "-0.02em",
            }}
          >
            Want to read more?
          </h3>
          <p
            style={{
              fontSize: tokens.font.md,
              color: tokens.colors.textMuted,
              marginBottom: tokens.spacing.xl,
              maxWidth: "400px",
              margin: `0 auto ${tokens.spacing.xl}`,
              lineHeight: 1.7,
            }}
          >
            I write about full stack development, cloud computing, and lessons from building real projects.
          </p>
          <Button
            href="https://github.com/SahilArate"
            target="_blank"
            variant="primary"
            size="md"
          >
            Follow on GitHub →
          </Button>
        </div>
      </motion.div>
    </section>
  );
}