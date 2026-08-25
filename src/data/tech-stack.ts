/**
 * Core technologies shown in the technology strip beneath the hero.
 * Icons come from lucide-react — kept generic/representative since
 * lucide doesn't ship brand marks for every framework.
 */

export type TechStackItem = {
  name: string;
};

export const techStack: TechStackItem[] = [
  { name: "Next.js" },
  { name: "React" },
  { name: "TypeScript" },
  { name: "Node.js" },
  { name: "MongoDB" },
  { name: "Tailwind CSS" },
];
