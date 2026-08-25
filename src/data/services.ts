/**
 * Services offered. `icon` refers to a lucide-react icon name resolved
 * in the Services section component.
 */

export type Service = {
  title: string;
  description: string;
  icon: "Layers" | "MonitorSmartphone" | "Server" | "Workflow";
};

export const services: Service[] = [
  {
    title: "Full Stack Development",
    description:
      "Modern web applications using React, Next.js, Node.js and MongoDB — end to end.",
    icon: "Layers",
  },
  {
    title: "Frontend Development",
    description:
      "Responsive, accessible interfaces built with React, Next.js and Tailwind CSS.",
    icon: "MonitorSmartphone",
  },
  {
    title: "Backend Development",
    description:
      "REST APIs, authentication, databases, and scalable backend architecture.",
    icon: "Server",
  },
  {
    title: "Business Automation",
    description:
      "AI-powered workflows and automation to streamline business processes.",
    icon: "Workflow",
  },
];
