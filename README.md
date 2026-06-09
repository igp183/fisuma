<div align="center">

# FISUMa

**Website of the Physics Nucleus at Universidade da Madeira**

[![Figma](https://img.shields.io/badge/Figma-Design-F24E1E?style=flat-square&logo=figma&logoColor=white)](https://www.figma.com/design/B0JeHe5WCU6Of6jRBzTMi5/FISUMa?node-id=0-1)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

</div>

---

## Getting Started

**Prerequisites:** Node.js 20+, access to the Supabase project is recommended.

```bash
git clone https://github.com/igp183/fisuma
cd fisuma
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Design

You can check the current state of the site's design mockups [here](https://www.figma.com/design/B0JeHe5WCU6Of6jRBzTMi5/FISUMa?node-id=0-1&t=skZL0Fy9eUyyzl5R-1)

## Project Structure

[locale] allows to display different contents depending on the language (check [Next.js Dynamic routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) if you want more information on the topic).
```
app/
  [locale]/
    page.tsx
messages/
  pt.json
  en.json
```

---

<div align="center">
  Have a question? Open an issue or reach out to us.
</div>
