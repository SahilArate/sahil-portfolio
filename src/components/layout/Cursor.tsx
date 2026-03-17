"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export default function Cursor() {
  const { isDark } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config — outer ring lags behind mouse for smooth feel
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp   = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hoverable elements
    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']"
      );
      setIsHovering(!!hoverable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleHoverStart);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup",   handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleHoverStart);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup",   handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  const accentColor = isDark ? "#63ffb4" : "#16a34a";

  return (
    <>
      {/* Outer spring ring */}
      <motion.div
        ref={cursorRef}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "none",
          width: isHovering ? "48px" : "32px",
          height: isHovering ? "48px" : "32px",
          borderRadius: "50%",
          border: `1.5px solid ${accentColor}`,
          opacity: isVisible ? (isHovering ? 0.9 : 0.5) : 0,
          scale: isClicking ? 0.8 : 1,
          transition: "width 200ms ease, height 200ms ease, opacity 200ms ease, scale 100ms ease",
          mixBlendMode: "difference",
        }}
      />

      {/* Inner dot — follows mouse exactly */}
      <motion.div
        ref={dotRef}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "none",
          width: isClicking ? "6px" : "4px",
          height: isClicking ? "6px" : "4px",
          borderRadius: "50%",
          backgroundColor: accentColor,
          opacity: isVisible ? 1 : 0,
          transition: "width 100ms ease, height 100ms ease, opacity 200ms ease",
        }}
      />
    </>
  );
}