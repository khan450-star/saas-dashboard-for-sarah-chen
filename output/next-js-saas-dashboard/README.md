# Next.js SaaS Dashboard

A modern SaaS dashboard built with Next.js 14, React 18, TypeScript, Tailwind CSS, Prisma ORM, NextAuth.js, and Stripe integration.

## Features

- 🔐 **Authentication** - NextAuth.js with credentials provider
- 💳 **Billing** - Stripe integration for subscription management
- 📊 **Dashboard** - Analytics and user management
- ⚙️ **Settings** - User profile and notification preferences
- 🎨 **Modern UI** - Tailwind CSS with responsive design
- 🗄️ **Database** - Prisma ORM with SQLite
- 🔒 **Type Safety** - Full TypeScript support

## Quick Start

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

## Demo Credentials

For testing the authentication:
- **Email:** demo@example.com
- **Password:** demo123

## Environment Variables

The project includes demo environment variables in `.env` and `.env.local`. For production:

- `DATABASE_URL` - Your database connection string
- `NEXTAUTH_SECRET` - Random string for NextAuth.js
- `NEXTAUTH_URL` - Your domain URL
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key

## Project Structure

```
src/
├── app/                 # Next.js 14 App Router
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   └── api/           # API routes
├── components/         # Reusable components
├── lib/               # Utility functions
└── prisma/            # Database schema and seed
```

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Prisma ORM with SQLite
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **UI Icons:** Lucide React

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma db push` - Push schema changes to database
- `npx prisma db seed` - Seed the database

## Pages

1. **Landing Page** (`/`) - Marketing homepage with features and pricing
2. **Sign In** (`/auth/signin`) - User authentication
3. **Sign Up** (`/auth/signup`) - User registration
4. **Dashboard** (`/dashboard`) - Main dashboard with analytics
5. **Settings** (`/dashboard/settings`) - User profile and preferences
6. **Billing** (`/dashboard/billing`) - Subscription management

## License

MIT License - feel free to use this project for your own SaaS application.