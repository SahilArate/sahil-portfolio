export type Theme = "light" | "dark";

export type NavItem = {
  label: string;
  href: string;
};

export type SkillLevel = "Expert" | "Advanced" | "Proficient";

export type SkillCategory = "Frontend" | "Backend" | "Cloud" | "Mobile";

export interface Skill {
  name: string;
  pct: number;
  icon: string;
  color: string;
  level: SkillLevel;
  category: SkillCategory;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  icon: string;
  accentColor: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: "internship" | "job" | "freelance";
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}
