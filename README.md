# SaaS Dashboard for Sarah Chen

A Next.js 14 SaaS dashboard with authentication, Stripe billing, and user management.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up database:
```bash
npx prisma db push
npx prisma db seed
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Features

- **Authentication**: Email/password with NextAuth.js
- **Billing**: Stripe integration for subscriptions
- **Dashboard**: Protected user dashboard with metrics
- **Settings**: Profile management
- **Responsive**: Mobile-first design with Tailwind CSS

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript 5.x
- Tailwind CSS 3.4
- Prisma ORM 5.x
- SQLite (dev) / PostgreSQL (prod)
- NextAuth.js 4.x
- Stripe SDK
- Zod validation

## Environment Variables

Copy `.env.example` to `.env.local` and update with your values:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## Stripe Setup

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Set up a webhook endpoint pointing to `/api/stripe/webhook`
4. Add webhook events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

## Local Webhook Testing

Use Stripe CLI for local webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Make sure to:
1. Add environment variables in Vercel dashboard
2. Update `NEXTAUTH_URL` to your production domain
3. Update Stripe webhook URL to your production domain

## License

MIT