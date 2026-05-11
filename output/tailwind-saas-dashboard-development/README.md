# Tailwind SaaS Dashboard

A modern SaaS dashboard built with Next.js 14, React, TypeScript, Tailwind CSS, and NextAuth.js.

## Features

- 🔐 Authentication with NextAuth.js
- 📊 Dashboard with analytics and charts
- 👥 User management system
- 💳 Billing integration with Stripe
- ⚙️ Settings and notifications
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npm run db:push
npm run db:seed
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

- Email: `admin@demo.com`
- Password: `admin123`

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Database:** SQLite with Prisma ORM
- **Charts:** Recharts
- **Icons:** Lucide React
- **Payments:** Stripe (configured for demo)

## Project Structure

```
src/
├── app/                 # App Router pages
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   └── page.tsx        # Home page
├── components/         # React components
├── lib/               # Utility functions and configurations
└── types/             # TypeScript type definitions
```

## Environment Variables

The project comes with demo environment variables. For production, update:

- `NEXTAUTH_SECRET`: A secure random string
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `DATABASE_URL`: Your production database URL

## Features Overview

### Dashboard
- Overview statistics
- User growth charts
- Recent activity feed

### Analytics
- Revenue trends
- Session metrics
- Performance indicators

### User Management
- User listing and search
- Role management
- User statistics

### Billing
- Subscription management
- Invoice history
- Plan upgrades

### Settings
- Account preferences
- Notification settings
- Profile management

## Development

To extend the dashboard:

1. Add new pages in `src/app/dashboard/`
2. Create components in `src/components/`
3. Add API routes in `src/app/api/`
4. Update the database schema in `prisma/schema.prisma`

## License

MIT License - feel free to use for personal and commercial projects.