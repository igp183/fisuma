# Database

The database runs on [Supabase](https://supabase.com) (PostgreSQL). 
All schema changes must go through migrations and never be done directly on the dashboard.

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- Access to the project (ask a maintainer)

## Setup

```bash
npm install -g supabase
supabase login
supabase link --project-ref <project-ref>
```

## Migrations

### Applying existing migrations

```bash
supabase db push
```

This brings your local or production database up to date with all migrations in `supabase/migrations/`.

### Creating a new migration

Don't alter the schema directly. Instead:

```bash
supabase migration new <description>
# e.g. supabase migration new add_events_table
```

This creates a new file in `supabase/migrations/`. Write your SQL there, then push:

```bash
supabase db push
```

Commit the migration file alongside your code changes in the same PR.

### Pulling schema changes (if you made changes in the dashboard)

```bash
supabase db pull
```

This generates a migration from the current state of the database. Review it before committing.

> ⚠️ This should only be used to recover changes accidentally made through the dashboard.<br>
> The normal workflow is always to write migrations manually.

## Seeding local data

```bash
supabase db reset
```

This resets your local database and runs `supabase/seed.sql`, which contains sample events, posts, and other data for development. Never put real data in `seed.sql`.

## Rules

- Schema changes always via migration, never via dashboard in production
- Every migration file is committed to the repo
- `seed.sql` is for fake development data only
- If you're unsure, open an issue before touching the schema
