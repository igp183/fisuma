<div align="center">

# FISUMa

**Website of the Physics Nucleus at Universidade da Madeira**

[![Figma](https://img.shields.io/badge/Figma-Design-F24E1E?style=flat-square&logo=figma&logoColor=white)](https://www.figma.com/design/B0JeHe5WCU6Of6jRBzTMi5/FISUMa?node-id=0-1)
[![Astro](https://img.shields.io/badge/Astro-6-orange?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

</div>

---

## Getting Started

**Prerequisites:** Node.js 20+. Ask a maintainer for the `.env.local` file if you need to connect to the database.

```bash
git clone https://github.com/igp183/fisuma
cd fisuma
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Design

You can check the current state of the site's design mockups [here](https://www.figma.com/design/B0JeHe5WCU6Of6jRBzTMi5/FISUMa?node-id=0-1&t=skZL0Fy9eUyyzl5R-1)

---

### Setup of the Backend

### 1. Configure Environment Variables

Create a `.env` file in the project root (same level as the `app/` folder).
You can start by copying the example file:

```bash
cp .env.example .env

### 2. Install Dependencies

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Set Up Database

```bash
# Make sure PostgreSQL is running

Examples:
- **Linux:**
  ```bash
  sudo service postgresql start

- **macOS:**
  ```bash
  brew services start postgresql

- **Windows:**
  Start the PostgreSQL service from Services:

    Press Win + R
    Type services.msc
    Find PostgreSQL
    Click Start if is not running

# Create the database and enable pgvector extension

psql -U postgres
CREATE DATABASE your_database_name;
\c your_database_name
CREATE EXTENSION vector;
```

### 4. Start the Backend Server

```bash
# Start the development server
python -m uvicorn app.src.main:app --host 0.0.0.0 --port 8000 --reload
```

### 5. Access the API

After the backend is running, you can access:

- **API**: http://localhost:8000
- **Swagger Documentation**: http://localhost:8000/docs

### 6. Developer Documentation

This project includes additional developer documentation intended for
frontend and backend integrators.

The `docs/` folder contains:
- Descriptions of available FastAPI endpoints. (**WiP**)
- WebSocket events and message formats. (**WiP**)

Please access the documentation in the `docs/` directory for full details.

### Setup of the FrontEnd

## Technologies Used

-   **Frontend**:
    -   Next.js (App Router)
    -   React
    -   TypeScript
    -   Tailwind CSS
    -   Shadcn/ui
    -   Zod (for schema validation)
    -   React Hook Form

## How to Run (Step-by-Step)

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following software installed on your machine:

-   **Node.js**: Version 18.x or higher (recommended).
-   **pnpm**: JavaScript package manager.


### 1. Configure Environment Variables

Create a `.env` file in the project root (in the same folder as `package.json`).

**Note**: If your backend is running on a different port or URL, adjust `BACKEND_URL` accordingly.


### 2. Configure and Start the Frontend

```bash
# Install dependencies
pnpm install


# Start the development server
pnpm run dev
```

### 5. Access the Application

After both the backend and frontend are running, open your browser and navigate to:

[http://localhost:3000](http://localhost:3000)

The application should be accessible and ready to use.


<div align="center">
  Have a question? Open an issue or reach out to us.
</div>
