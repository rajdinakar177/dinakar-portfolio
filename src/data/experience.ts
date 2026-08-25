/**
 * Work experience timeline data.
 *
 * PLACEHOLDER: no real employment history was provided, so this entry is
 * clearly marked as a placeholder. Replace it with real company/role
 * details, or add more entries — the Experience section renders however
 * many are in this array.
 */

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  isPlaceholder?: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    company: "Mayura Consultancy Services",
    role: "Full Stack Developer",
    period: "2023 — Present",
    location: "Remote",
    description:
      "Developing and maintaining full-stack web applications using modern JavaScript technologies, with experience across frontend development, backend APIs, databases, authentication, and deployment.",
    responsibilities: [
      "Developed responsive web applications using React, Next.js, TypeScript, JavaScript, HTML, CSS, Bootstrap, and Tailwind CSS",
      "Built and integrated REST APIs using Node.js and implemented authentication and authorization using JWT and bcrypt",
      "Designed and managed databases using MongoDB, Mongoose, and SQL/MySQL",
      "Worked on PHP and CodeIgniter 3 applications, including backend development and database integration",
      "Integrated third-party services such as Cloudinary and Brevo for media management and email functionality",
      "Used Git and GitHub for version control and collaborated on application development and maintenance",
      "Deployed and maintained web applications using Vercel",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "PHP",
      "CodeIgniter 3",
      "MongoDB",
      "MySQL",
      "SQL",
      "Bootstrap",
      "Tailwind CSS",
      "Git",
      "GitHub",
      "Vercel",
    ],
    isPlaceholder: false,
  },
];