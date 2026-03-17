import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "atomity",
    title: "Atomity — Cloud Cost Intelligence",
    description:
      "Multi-cloud infrastructure topology map built for Atomity's Frontend Engineering Challenge.",
    longDescription:
      "Visualizes real-time resource usage across AWS, Azure, GCP and On-Premise clusters with interactive node selection, animated connection lines, scroll-triggered animations, dark mode, full accessibility, and TanStack Query caching.",
    tags: [
      "Next.js 16",
      "TypeScript",
      "Framer Motion",
      "TanStack Query",
      "Tailwind CSS",
      "Design Tokens",
      "Container Queries",
      "Dark Mode",
    ],
    liveUrl: "https://atomity-challenge-nu.vercel.app/",
    githubUrl: "https://github.com/SahilArate/atomity-challenge",
    featured: true,
    icon: "⚡",
    accentColor: "#63ffb4",
    metrics: [
      { label: "Cloud Providers", value: "4" },
      { label: "Components",      value: "10+" },
      { label: "TypeScript",      value: "100%" },
    ],
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment Platform",
    description:
      "Comprehensive digital platform providing real-time job matching for pregnant women and AI-powered mental health counseling.",
    longDescription:
      "A full-stack platform with real-time pregnancy-friendly job recommendations, AI mental health chatbot using GenAI and LLM, mental exercise tracking, guided meditation, book recommendations via Google Books API, and JWT-based secure authentication.",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "GenAI",
      "LLM",
      "JWT",
    ],
    featured: false,
    icon: "💜",
    accentColor: "#a78bfa",
  },
  {
    id: "fetal-monitoring",
    title: "Fetal Monitoring System",
    description:
      "Smart IoT healthcare system tracking baby kicks in real-time using MPU6050 sensor.",
    longDescription:
      "An IoT-based healthcare monitoring system that tracks baby kicks and movements in real-time, providing expecting mothers with peace of mind through data-driven insights. Uses Firebase cloud sync, rich data visualization, and AI-powered analysis via Gemini API.",
    tags: [
      "ESP8266",
      "MPU6050",
      "React Native",
      "Firebase",
      "Gemini API",
      "IoT",
    ],
    featured: false,
    icon: "🔬",
    accentColor: "#60a5fa",
  },
  {
    id: "smallcase",
    title: "SmallCase Funding Platform",
    description:
      "Sophisticated funding and financial analysis platform with interactive dashboards.",
    longDescription:
      "Built a sophisticated funding and financial analysis platform with advanced data visualization capabilities, enabling investors to make informed decisions through comprehensive market insights. Containerized with Docker and deployed on AWS.",
    tags: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Docker",
      "AWS",
      "Chart.js",
    ],
    featured: false,
    icon: "📈",
    accentColor: "#fbbf24",
  },
  {
    id: "data-viz",
    title: "Data Visualization Dashboard",
    description:
      "Interactive data visualization system transforming complex datasets into clear actionable insights.",
    longDescription:
      "Designed and developed an interactive data visualization system that transforms complex datasets into clear, actionable insights through modern charting libraries and intuitive UI design. AWS-hosted for global accessibility.",
    tags: ["JavaScript", "D3.js", "Chart.js", "AWS", "REST API"],
    featured: false,
    icon: "📊",
    accentColor: "#63ffb4",
  },
];