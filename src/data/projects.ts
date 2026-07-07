import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "weeklyai",
    title: "WeeklyAI — Multi-Agent AI Weekly Planner",
    description:
      "Production-grade multi-agent AI system where 5 specialized LangGraph agents debate, negotiate, and autonomously build your perfect weekly schedule from plain-English goals — streamed live in real time.",
    longDescription:
      "WeeklyAI is a full-stack AI SaaS application powered by a 5-agent LangGraph orchestration pipeline. The Goal Agent parses user intent, the Calendar Agent identifies free slots, the Energy Agent maps peak productivity windows, the Balance Agent ensures no day is overloaded, and the Planner Agent resolves all conflicts to produce a final optimized weekly calendar. Every agent message streams live to the frontend via WebSockets, creating a real-time 'agent debate' experience. Built with Next.js 14, FastAPI, LangGraph, Groq LLaMA-3.3 70B, PostgreSQL + pgvector for RAG-based habit memory, Supabase Auth, Redis, and Docker. Features include a weekly calendar UI, task completion tracking with Pomodoro timer, analytics dashboard, AI chat interface, plan templates, and full auth with saved plans.",
    tags: [
      "Next.js 14",
      "TypeScript",
      "FastAPI",
      "Python",
      "LangGraph",
      "LangChain",
      "Multi-Agent AI",
      "Groq LLaMA-3.3 70B",
      "WebSockets",
      "RAG",
      "pgvector",
      "PostgreSQL",
      "Supabase",
      "Redis",
      "Docker",
      "Tailwind CSS",
    ],
    liveUrl: "https://multi-agent-ai-weekly-planner.vercel.app/",
    githubUrl: "https://github.com/SahilArate/Multi-agent-AI-weekly-planner",
    featured: true,
    icon: "🧠",
    accentColor: "#3b82f6",
    metrics: [
      { label: "AI Agents", value: "5" },
      { label: "Plan Time", value: "<15s" },
      { label: "Stack", value: "Full" },
      { label: "Streaming", value: "Live" },
    ],
  },
  {
  id: "codekeeper",
  title: "Codekeeper",
  description:
    "AI-powered legacy code intelligence tool. Ask questions about any codebase in plain English — the system builds a knowledge graph from source files, git history, and docs using Cognee's memory lifecycle APIs.",
  longDescription:
    "Codekeeper gives legacy codebases a persistent memory. Paste a GitHub URL and it ingests every Python file, git commit, and markdown doc into Cognee's knowledge graph via remember() and cognify(). Developers can then ask why old decisions were made, trace dependencies with impact analysis, and see the actual knowledge graph visualized with React Flow. Uses all four Cognee memory lifecycle methods — remember, cognify, search with GRAPH_COMPLETION, improve from feedback, and forget for cleanup. Built for the WeMakeDevs × Cognee Hackathon 2026.",
  tags: [
    "Next.js 16",
    "FastAPI",
    "Cognee",
    "Cognee Cloud",
    "TypeScript",
    "Python",
    "React Flow",
    "Knowledge Graph",
    "fastembed",
  ],
  icon: "🧠",
  accentColor: "#22c55e",
  featured: true,
  liveUrl: "https://cognee-hackathon-psi.vercel.app/",
  githubUrl: "https://github.com/SahilArate/cognee_hackathon-",
  metrics: [
    { value: "4", label: "Memory Lifecycle APIs" },
    { value: "3", label: "Data Sources" },
    { value: "Graph", label: "GRAPH_COMPLETION Search" },
    { value: "Cloud", label: "Cognee Cloud" },
    ],
  },
  {
    id: "querygraph",
    title: "QueryGraph",
    description:
      "LLM-powered SAP Order-to-Cash intelligence platform. Ask questions in plain English — the system generates SQL, queries a dual PostgreSQL + Neo4j database, and streams answers token-by-token.",
    longDescription:
      "A context graph system that unifies fragmented SAP O2C data into an interactive knowledge graph with a natural language query interface. Users can trace full order-to-cash flows, detect broken pipelines, and explore customer clusters — all through conversational queries powered by Groq's LLaMA 3.3 70B with streaming SSE responses.",
    tags: [
      "Next.js 14",
      "FastAPI",
      "PostgreSQL",
      "Neo4j",
      "Groq LLaMA 3.3",
      "Cytoscape.js",
      "TypeScript",
      "Python",
      "SSE Streaming",
    ],
    icon: "🔮",
    accentColor: "#63ffb4",
    featured: true,
    liveUrl: "https://query-graph-llm-powered-data-intell.vercel.app/",
    githubUrl:
      "https://github.com/SahilArate/QueryGraph-LLM-Powered-Data-Intelligence",
    metrics: [
      { value: "70B", label: "LLM Params" },
      { value: "2 DBs", label: "PostgreSQL + Neo4j" },
      { value: "SSE", label: "Streaming Responses" },
      { value: "7", label: "Graph Node Types" },
    ],
  },
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
      { label: "Components", value: "10+" },
      { label: "TypeScript", value: "100%" },
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