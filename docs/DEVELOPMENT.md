# Development

## Prerequisites

- Node.js 20+
- pnpm (Package manager)
- Access to the Supabase project (ask a maintainer for the `.env.local` file)

## Local setup

```bash
git clone https://github.com/igp183/fisuma
cd fisuma
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Branch naming

| Type | Example |
|------|---------|
| Feature | `feat/events-page` |
| Bug fix | `fix/nav-mobile` |
| Content / copy | `chore/update-team-section` |

Always branch from `main`.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add events listing page
fix: correct mobile nav overflow
chore: update PT translations
docs: add setup instructions
```

## Opening a PR

1. Push your branch
2. Open a PR against `main`
3. Fill in a short description of what changed and why
4. Request a review from a maintainer

## Project structure

```
app/                # Backend (FastAPI / Python)
  src/
src/                # Frontend (Next.js / React)
  pages/
    index.tsx
    about.tsx
    events.tsx
    en/
      index.tsx
      about.tsx
      events.tsx
  components/
    ui/             # shadcn/ui components
  lib/              # Utility functions (e.g., Tailwind merge)
messages/           # Translation strings
  pt.json
  en.json
public/             # Static assets (images, icons)
supabase/
  migrations/
  seed.sql
```
