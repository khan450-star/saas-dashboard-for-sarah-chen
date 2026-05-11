# SaaS Dashboard MVP

A modern SaaS dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (local) / PostgreSQL (production)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **Payments**: Stripe
- **Deployment**: Vercel

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up the database**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file with the following variables:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## Features

- User authentication (sign up, sign in, sign out)
- Protected dashboard with metrics
- Profile settings management
- Stripe billing integration
- Responsive design
- Type-safe database access

## Development

- **Database changes**: Run `npx prisma db push` after modifying `schema.prisma`
- **Reset database**: Delete `dev.db` and run setup commands again
- **View database**: Use `npx prisma studio`

## Deployment

Deploy to Vercel with one click. Make sure to set up your environment variables in the Vercel dashboard.