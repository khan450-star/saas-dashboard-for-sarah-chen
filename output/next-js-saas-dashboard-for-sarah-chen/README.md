# Next.js SaaS Dashboard

A modern SaaS dashboard built with Next.js 14, featuring user authentication, subscription billing, and analytics integration.

## Features

- ✅ **Authentication**: NextAuth.js with credentials and Google OAuth
- ✅ **Billing**: Stripe integration with subscriptions and customer portal
- ✅ **Database**: PostgreSQL with Prisma ORM
- ✅ **UI**: Tailwind CSS with responsive design
- ✅ **Analytics**: PostHog integration
- ✅ **Email**: Resend for transactional emails
- ✅ **TypeScript**: Full type safety

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Auth.js)
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Analytics**: PostHog
- **Email**: Resend
- **Deployment**: Vercel

## Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Set up the database**:
```bash
npx prisma db push
npx prisma db seed
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Resend
RESEND_API_KEY="re_..."

# PostHog
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
```

## Database Setup

This project uses SQLite for local development. The database will be created automatically when you run:

```bash
npx prisma db push
```

To seed the database with sample data:

```bash
npx prisma db seed
```

## Test Accounts

After seeding, you can use these test accounts:

- **Email**: test@example.com
- **Password**: password123

Or:

- **Email**: sarah.chen@example.com
- **Password**: password123

## Stripe Setup

For billing functionality:

1. Create a [Stripe account](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. Create products and prices in Stripe
4. Set up webhooks pointing to `/api/billing/webhook`
5. Update environment variables

## Deployment

This project is optimized for [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

For production, make sure to:
- Use a production PostgreSQL database
- Update `NEXTAUTH_URL` to your domain
- Use production Stripe keys
- Configure proper email settings

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard page
│   ├── settings/       # Settings page
│   └── billing/        # Billing page
├── components/         # Reusable components
├── lib/               # Utilities and configurations
└── types/             # TypeScript type definitions
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma db seed` - Seed the database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, please contact [sarah.chen@example.com](mailto:sarah.chen@example.com).