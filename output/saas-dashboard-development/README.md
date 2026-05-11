# SaaS Dashboard

A modern SaaS dashboard built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma db push
npx prisma db seed
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Features

- Dashboard with analytics and charts
- User management
- Settings and billing pages
- Authentication with NextAuth.js
- Stripe integration for payments
- Responsive design with Tailwind CSS

## Stack

- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Prisma with SQLite
- NextAuth.js
- Stripe
- Recharts for data visualization
- React Query for data fetching