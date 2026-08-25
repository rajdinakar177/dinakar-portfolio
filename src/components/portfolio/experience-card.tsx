import { MapPin, Calendar } from "lucide-react";

import type { ExperienceEntry } from "@/data/experience";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type ExperienceCardProps = {
  entry: ExperienceEntry;
};

export function ExperienceCard({ entry }: ExperienceCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">{entry.role}</CardTitle>
            <p className="text-primary text-sm font-medium">
              {entry.company}
            </p>
          </div>
          {entry.isPlaceholder ? (
            <Badge variant="outline">Placeholder</Badge>
          ) : null}
        </div>
        <CardDescription className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            {entry.period}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {entry.location}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-body">{entry.description}</p>

        <ul className="text-body flex flex-col gap-1.5">
          {entry.responsibilities.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-primary mt-2 size-1 shrink-0 rounded-full bg-current" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {entry.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
