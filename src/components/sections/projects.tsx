import { getGitHubProjects } from "@/services/github";
import { ProjectCard } from "@/components/portfolio/project-card";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/motion-wrap";

export async function Projects() {
  const githubProjects = await getGitHubProjects();

  return (
    <Section id="projects" className="bg-surface">
      <SectionHeading
        eyebrow="Projects"
        heading="Things I've built"
        description="My latest projects from GitHub."
      />

      <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {githubProjects.map((repo) => (
          <StaggerItem key={repo.id}>
            <ProjectCard project={repo} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}