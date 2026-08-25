"use client";

import * as React from "react";
import { Loader2, CheckCircle2, AlertCircle, Mail } from "lucide-react";

import {
  leadSchema,
  projectTypeOptions,
  type LeadInput,
} from "@/lib/validation";
import { contactConfig, socialLinks } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp } from "@/components/shared/motion-wrap";
import { LinkedInBadge } from "@/components/shared/linkedin-badge";

type FormState = LeadInput;

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
  hpToken: "",
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [form, setForm] = React.useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = React.useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [status, setStatus] = React.useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        name: errors.name?.[0],
        email: errors.email?.[0],
        message: errors.message?.[0],
      });
      return;
    }

    setStatus("submitting");
    setStatusMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data: { error?: string } = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setStatusMessage(
          data.error ?? "Something went wrong. Please try again.",
        );
        return;
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
      setStatusMessage(
        "Network error — please check your connection and try again.",
      );
    }
  }

  const isSubmitting = status === "submitting";
  const emailLink = socialLinks.find((link) => link.icon === "mail");

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow={contactConfig.eyebrow}
        heading={contactConfig.heading}
        description={contactConfig.description}
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
        <FadeUp className="max-w-xl">
          {status === "success" ? (
            <div className="border-success/30 bg-success/10 flex items-start gap-3 rounded-lg border p-4">
              <CheckCircle2 className="text-success mt-0.5 size-5 shrink-0" />
              <div>
                <p className="text-body font-medium">Message sent.</p>
                <p className="text-small mt-1">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
                <Button
                  variant="link"
                  className="mt-1 h-auto p-0"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Honeypot — hidden from real users, catches basic bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company_website">Leave this field empty</label>
                <input
                  id="company_website"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.hpToken}
                  onChange={(e) => updateField("hpToken", e.target.value)}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    aria-invalid={Boolean(fieldErrors.name)}
                    disabled={isSubmitting}
                    required
                  />
                  {fieldErrors.name ? (
                    <p className="text-destructive text-xs">
                      {fieldErrors.name}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    aria-invalid={Boolean(fieldErrors.email)}
                    disabled={isSubmitting}
                    required
                  />
                  {fieldErrors.email ? (
                    <p className="text-destructive text-xs">
                      {fieldErrors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="projectType">Project type</Label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={(e) => updateField("projectType", e.target.value)}
                    disabled={isSubmitting}
                    className={cn(
                      "border-input flex h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                  >
                    <option value="" className="bg-background text-foreground">
                      Select one (optional)
                    </option>
                    {projectTypeOptions.map((option) => (
                      <option key={option} value={option} className="bg-background text-foreground">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="budget">Budget (optional)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g. $2,000–$5,000"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  aria-invalid={Boolean(fieldErrors.message)}
                  disabled={isSubmitting}
                  required
                />
                {fieldErrors.message ? (
                  <p className="text-destructive text-xs">
                    {fieldErrors.message}
                  </p>
                ) : null}
              </div>

              {status === "error" && statusMessage ? (
                <div className="border-destructive/30 bg-destructive/10 flex items-start gap-2 rounded-lg border p-3">
                  <AlertCircle className="text-destructive mt-0.5 size-4 shrink-0" />
                  <p className="text-body">{statusMessage}</p>
                </div>
              ) : null}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="sm:w-fit"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : null}
                {isSubmitting ? "Sending…" : "Send message"}
              </Button>
            </form>
          )}
        </FadeUp>

        <FadeUp delay={0.1} className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Connect
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <LinkedInBadge />
              {emailLink ? (
                <a
                  href={emailLink.href}
                  className="text-nav-link inline-flex items-center gap-2"
                >
                  <Mail className="size-3.5" />
                  {emailLink.href.replace("mailto:", "")}
                </a>
              ) : null}
            </CardContent>
          </Card>
        </FadeUp>
      </div>
    </Section>
  );
}
