export type Project = {
  id: string;
  slug: string;
  name: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  source: "curated" | "github";
};