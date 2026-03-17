import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "JavaScript", pct: 95, icon: "⚡", color: "#F2A623", level: "Expert",    category: "Frontend" },
  { name: "React",      pct: 90, icon: "⚛",  color: "#61DAFB", level: "Expert",    category: "Frontend" },
  { name: "TypeScript", pct: 85, icon: "🔷", color: "#3178C6", level: "Advanced",  category: "Frontend" },
  { name: "Next.js",    pct: 88, icon: "▲",  color: "#aaaaaa", level: "Advanced",  category: "Frontend" },
  { name: "CSS",        pct: 90, icon: "🎨", color: "#2965F1", level: "Expert",    category: "Frontend" },
  { name: "Tailwind",   pct: 85, icon: "💨", color: "#38BDF8", level: "Advanced",  category: "Frontend" },
  { name: "Framer Motion", pct: 80, icon: "✦", color: "#BB4AFF", level: "Advanced", category: "Frontend" },
  { name: "HTML",       pct: 95, icon: "🧱", color: "#E44D26", level: "Expert",    category: "Frontend" },

  // Backend
  { name: "Node.js",   pct: 95, icon: "🟢", color: "#68A063", level: "Expert",    category: "Backend" },
  { name: "MongoDB",   pct: 85, icon: "🍃", color: "#4DB33D", level: "Advanced",  category: "Backend" },
  { name: "MySQL",     pct: 82, icon: "🐬", color: "#00758F", level: "Advanced",  category: "Backend" },
  { name: "REST API",  pct: 90, icon: "🔌", color: "#FF6B6B", level: "Expert",    category: "Backend" },
  { name: "Firebase",  pct: 80, icon: "🔥", color: "#FFA000", level: "Advanced",  category: "Backend" },
  { name: "Express",   pct: 88, icon: "⚙️", color: "#999999", level: "Advanced",  category: "Backend" },

  // Cloud
  { name: "AWS",    pct: 78, icon: "☁️", color: "#FF9900", level: "Proficient", category: "Cloud" },
  { name: "Azure",  pct: 72, icon: "🔵", color: "#0078D4", level: "Proficient", category: "Cloud" },
  { name: "Docker", pct: 85, icon: "🐳", color: "#2496ED", level: "Advanced",   category: "Cloud" },
  { name: "Git",    pct: 92, icon: "🌿", color: "#F05032", level: "Expert",     category: "Cloud" },
  { name: "Vercel", pct: 88, icon: "▲",  color: "#cccccc", level: "Advanced",   category: "Cloud" },

  // Mobile
  { name: "React Native", pct: 75, icon: "📱", color: "#61DAFB", level: "Proficient", category: "Mobile" },
  { name: "IoT / ESP",    pct: 70, icon: "📡", color: "#4CAF50", level: "Proficient", category: "Mobile" },
];

export const skillCategories = ["All", "Frontend", "Backend", "Cloud", "Mobile"] as const;

export type SkillCategoryFilter = typeof skillCategories[number];