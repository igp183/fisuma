# Development

## Prerequisites

- Node.js 20+
- Access to the Supabase project (ask a maintainer for the `.env.local` file)

## Local setup

```bash
git clone https://github.com/igp183/fisuma
cd fisuma
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

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
src/
  pages/
    index.astro
    about.astro
    events.astro
    en/
      index.astro
      about.astro
      events.astro
  components/
  layouts/
messages/
  pt.json
  en.json
public/
supabase/
  migrations/
  seed.sql
```
