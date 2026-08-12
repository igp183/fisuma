
# Database Setup

The FISUMa platform uses a PostgreSQL database. Depending on your development workflow, you can either use the **Supabase CLI** (recommended for full compatibility) or a standard **local PostgreSQL** installation.

All schema changes must go through migrations and never be done directly on the dashboard.

---

### Option 1: Supabase (Recommended)

# Database

The database runs on [Supabase](https://supabase.com) (PostgreSQL). 

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (required to run Supabase locally)
- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- Access to the project (ask a maintainer for an invite and the `<project-ref>`)

## Setup

```bash
# Using npm or pnpm
npm install -g supabase
# or: pnpm add -g supabase

supabase login
supabase link --project-ref <project-ref>
```

### Running Local Supabase

To start the local Supabase environment (this will spin up the database, API, and Studio locally):

```bash
supabase start
```

When you are done working, you can stop the containers:

```bash
supabase stop
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


### Option 2: Local PostgreSQL

## Setting up on Linux (Fedora)

Install PostgreSQL and pgvector,

```bash
sudo dnf install postgresql-server postgresql-contrib pgvector_16
```

Initialize the database,

```bash
sudo postgresql-setup --initdb --unit postgresql
```
Start and enable the service,

```bash
sudo systemctl enable --now postgresql
```

Create the Database and User,

```bash
sudo -u postgres psql
```

RUn the following SQL commands to set up the database,

```bash
CREATE DATABASE fisuma_db;
CREATE USER fisuma_user WITH ENCRYPTED PASSWORD 'your_password_here';
GRANT ALL PRIVILEGES ON DATABASE fisuma_db TO fisuma_user;
\c fisuma_db
CREATE EXTENSION vector;
\q
```

## Setting up on Windows

Install PostgreSQL,

    Download the Windows installer from the official EnterpriseDB website [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).

    Run the installer. (Remember the password you set for the default postgres user).

    Ensure the service is running (Press Win + R, type services.msc, find postgresql-x64, and ensure it is "Running").

Install pgvector,

    The easiest way on Windows is to run PostgreSQL via Docker or WSL2. If you must use native Windows, you will need to compile pgvector from source using Visual Studio C++ or download a pre-compiled Windows binary from the pgvector repository. [PGVector](https://github.com/pgvector/pgvector)

Create the databse,

    Open the SQL Shell (psql) application installed with PostgreSQL. Press Enter to accept the defaults until it asks for your password.

    Run the following commands,

    ```bash
    CREATE DATABASE fisuma_db;
    \c fisuma_db
    CREATE EXTENSION vector;
    \q
    ```

# Connecting Your App

Once your local database is running, create a .env file in the root of the project and add your connection string,

    ```bash
    DATABASE_URL="postgresql://fisuma_user:your_password_here@localhost:5432/fisuma_db"
    ```

