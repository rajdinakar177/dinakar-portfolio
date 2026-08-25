/**
 * Skills grouped by category. Add/remove entries here — the Skills
 * section renders whatever's in this array.
 */

export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
       "Bootstrap",
      "Tailwind CSS",
      "Redux Toolkit",
      "Zustand",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "PHP",
      "CodeIgniter 3",
      "REST APIs",
      "Authentication",
      "JWT",
      "bcrypt",
      "API Design",
    ],
  },
  {
    category: "Database",
    skills: [
      "MongoDB",
      "Mongoose",
      "SQL",
      "MySQL",
      "Neo4j",
      "CognoDB",
      "Graph Databases",
    ],
  },
  {
    category: "Cloud & Services",
    skills: [
      "Vercel",
      "Cloudinary",
      "Brevo",
    ],
  },
  {
    category: "Tools",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "npm",
      "Postman",
    ],
  },
];