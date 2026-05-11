# Educational Center Website

A modern educational platform built with Next.js 14, featuring course management, user authentication, and payment integration.

## Features

- Course catalog and management
- User authentication with NextAuth.js
- Student dashboard
- Admin panel
- Payment processing with Stripe
- Email notifications
- Responsive design with Tailwind CSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma migrate dev
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Copy `.env.local` and update with your actual values:
- Database connection string
- NextAuth secret
- Stripe keys
- SMTP configuration

## Tech Stack

- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- NextAuth.js
- Stripe

## Project Structure

- `/src/app` - App router pages and API routes
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and configurations
- `/prisma` - Database schema and migrations