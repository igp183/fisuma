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

### Creating a new migration

Don't alter the schema directly. Instead:

```bash
supabase migration new <description>
# e.g. supabase migration new add_events_table
```

Write your SQL in the generated file, then run `supabase db push`. Commit the migration file in the same PR as your code changes.

### Pulling schema changes (if you made changes in the dashboard)

```bash
supabase db pull
```

Review the generated file before committing.

> ⚠️ Only use this to recover changes accidentally made through the dashboard.

## Seeding local data

```bash
supabase db reset
```

Resets your local database with the sample data in `supabase/seed.sql`. Never put real data in `seed.sql`.

If you're unsure about anything, open an issue before touching the schema.
