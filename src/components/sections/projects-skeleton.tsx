import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="aspect-video animate-pulse bg-secondary" />
      <div className="space-y-4 p-6">
        <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
        <div className="h-3 w-full animate-pulse rounded bg-secondary" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-secondary" />
        <div className="flex gap-2">
          <div className="h-5 w-16 animate-pulse rounded bg-secondary" />
          <div className="h-5 w-20 animate-pulse rounded bg-secondary" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <Section id="projects" className="bg-surface">
      <SectionHeading
        eyebrow="Projects"
        heading="Things I've built"
        description="A curated selection of my work, with additional public projects pulled directly from GitHub."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </Section>
  );
}
