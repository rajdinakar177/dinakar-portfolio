/**
 * About section content. `value` fields are placeholders — replace with
 * real numbers once available.
 */

export const aboutContent = {
  intro: [
    "I'm a full stack developer focused on building modern, scalable web applications — from responsive, accessible interfaces down to well-structured backend systems.",
    "I work primarily with React and Next.js on the frontend, Node.js and MongoDB on the backend, and care a lot about clean architecture, maintainable code, and building things that are actually pleasant to use.",
  ],
};

export type AboutStat = {
  label: string;
  value: string;
};

export const aboutStats: AboutStat[] = [
  { label: "Years of experience", value: "3+" },
  { label: "Projects built", value: "20+" },
  { label: "Core technologies", value: "6+" },
  { label: "Focus area", value: "Full Stack" },
];
