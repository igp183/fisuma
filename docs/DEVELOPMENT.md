# Development

## Prerequisites

- Node.js 20+
- Access to the Supabase project (ask a maintainer for the `.env.local` values)

## Local setup

```bash
git clone https://github.com/igp183/fisuma
cd fisuma
npm install
cp .env.example .env.local
# Fill in the Supabase credentials in .env.local
npm run dev
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

Keep the message short and in the imperative (*"add"* not *"added"*).

## Opening a PR

1. Push your branch
2. Open a PR against `main`
3. Fill in a short description of what changed and why
4. Request a review from a maintainer

## Project structure

```
app/
  [locale]/         # Dynamic locale routing (PT default, EN optional)
    page.tsx
    events/
    about/
components/         # React components
messages/
  pt.json           
  en.json
supabase/
  migrations/       # All schema changes as SQL migrations
  seed.sql          # Sample data for local development
```
