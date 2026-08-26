import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import { certificates } from "@/data/certificates";

export function Certificates() {
  return (
    <section id="certificates" >
      <div className="container mx-auto mb-30 max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
            <Award className="h-4 w-4" />
            <span>Recognition</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Certificates & Recognition
          </h2>

          <p className="mt-4 text-muted-foreground">
            Certifications, achievements, and recognition earned throughout my
            professional journey.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <div
              key={certificate.title}
              className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-muted">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4">
                  <span className="rounded-full border bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
                    {certificate.type}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-tight">
                    {certificate.title}
                  </h3>

                  <span className="shrink-0 text-xs text-muted-foreground">
                    {certificate.date}
                  </span>
                </div>

                <p className="text-sm font-medium text-primary">
                  {certificate.issuer}
                </p>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {certificate.description}
                </p>

                {certificate.link && (
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                  >
                    View Certificate
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}