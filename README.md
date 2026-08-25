# Portfolio

Personal portfolio project.

## Stack (Module 1 — Foundation)

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org) (strict mode)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com) v4
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide React](https://lucide.dev) — icons
- [Framer Motion](https://motion.dev) — animation

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
src/
├── app/            # App Router routes, layout, global styles
├── components/
│   ├── ui/         # shadcn/ui primitives
│   └── shared/     # Custom composed components
├── lib/            # Shared utilities (cn(), etc.)
├── hooks/          # Custom React hooks
├── types/          # Shared TypeScript types
└── config/         # Site configuration/constants
```

## Environment Variables

Copy `.env.example` to `.env.local` before running features from later
modules (database, email, GitHub/LinkedIn integrations). Nothing in
`.env.example` is wired up yet in Module 1.

## Adding shadcn/ui components

This project was initialized with a manual shadcn/ui setup (`components.json`,
theme tokens in `src/app/globals.css`, `src/lib/utils.ts`). To add more
components once you have network access to `ui.shadcn.com`, use:

```bash
npx shadcn@latest add <component-name>
```

## Status

- [x] Module 1 — Project Foundation
- [ ] Module 2+ — TBD
