# Next.js SaaS Dashboard

A complete SaaS dashboard built with Next.js 14, featuring authentication, billing, and user management.

## Features

- 🔐 Authentication with NextAuth.js
- 💳 Stripe integration for billing and subscriptions
- 📊 Dashboard with analytics
- ⚙️ Settings and profile management
- 📱 Responsive design with Tailwind CSS
- 🗄️ Database with Prisma ORM (SQLite for development)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Copy `.env.local` and update the values:

- `DATABASE_URL`: SQLite database file location
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `NEXTAUTH_URL`: Your app URL
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret

## Tech Stack

- **Framework**: Next.js 14
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM with SQLite
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Dashboard pages
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI components
│   └── dashboard-layout.tsx
├── lib/                   # Utility functions
└── prisma/               # Database schema
```

## Deployment

1. Deploy to Vercel, Netlify, or your preferred platform
2. Set up environment variables in production
3. Configure Stripe webhooks
4. Set up production database (PostgreSQL recommended)

## License

MIT License