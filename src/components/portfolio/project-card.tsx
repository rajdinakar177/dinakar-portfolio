import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/shared/icons";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group h-full overflow-hidden py-0 transition-colors hover:border-primary/40">
      <div className="bg-secondary relative aspect-video w-full overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="from-secondary to-muted flex h-full w-full items-center justify-center bg-gradient-to-br">
            <GitHubIcon className="size-12 opacity-30" />
          </div>
        )}
      </div>

      <CardHeader className="pt-6">
        <CardTitle className="text-base">{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2 pb-6">
        {project.githubUrl ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={project.githubUrl} target="_blank" rel="noreferrer">
              <GitHubIcon className="size-4" />
              Code
            </Link>
          </Button>
        ) : null}
        {project.liveUrl ? (
          <Button variant="secondary" size="sm" asChild>
            <Link href={project.liveUrl} target="_blank" rel="noreferrer">
              Live <ArrowUpRight />
            </Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}