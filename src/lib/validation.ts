import { z } from "zod";

/**
 * Shared schema for the contact form — used both client-side (for inline
 * validation before submitting) and server-side (in the API route, which
 * never trusts client validation alone).
 *
 * `hpToken` is a honeypot field: it's visually hidden and unreachable by
 * keyboard for real users (see ContactForm), so it should always arrive
 * empty. Bots that blindly fill every field will trip it.
 */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address."),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  projectType: z.string().trim().max(100).optional().or(z.literal("")),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Add a few more details (at least 10 characters).")
    .max(2000, "Keep it under 2000 characters."),
  hpToken: z.string().optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const projectTypeOptions = [
  "New project",
  "Existing project / ongoing support",
  "Consulting",
  "Other",
] as const;
