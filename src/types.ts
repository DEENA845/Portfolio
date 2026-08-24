export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullCaseStudy?: {
    challenge: string;
    solution: string;
    metrics: string[];
    features: string[];
    architecture: string[];
  };
  category: 'Web App' | 'Design System' | 'Creative Tech' | 'Open Source' | 'AI & Tools';
  tags: string[];
  metricBadge?: string;
  image: string;
  extraImages?: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
}

export interface SkillCategory {
  name: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 1-100
    highlight?: boolean;
    tag?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  relation: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface ProfileData {
  name: string;
  title: string;
  role: string;
  tagline: string;
  shortBio: string;
  fullBio: string[];
  location: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  heroImage: string;
  secondaryImage: string;
  resumeUrl: string;
  stats: StatItem[];
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  testimonials: TestimonialItem[];
}

export type AccentPreset = {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  glow: string;
  tailwindClass: string;
};
