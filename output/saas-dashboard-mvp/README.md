# SaaS Dashboard MVP

A modern SaaS dashboard built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and Stripe integration.

## Features

- **Authentication**: NextAuth.js v5 with credentials and Google OAuth
- **Dashboard**: Protected dashboard with analytics and user management
- **Billing**: Stripe integration for subscriptions and payments
- **Database**: Prisma ORM with SQLite (development)
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Form Validation**: Zod schemas for input validation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM + SQLite
- **Authentication**: NextAuth.js v5
- **Payments**: Stripe
- **Validation**: Zod
- **UI Components**: Custom components with Radix-inspired design

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npm run db:push
   npm run db:seed
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## Demo Credentials

- **Email**: demo@example.com
- **Password**: password123

## Environment Variables

The application comes with default development environment variables. For production, update these in `.env.local`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_your_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_key"
STRIPE_WEBHOOK_SECRET="whsec_your_secret"
```

## Project Structure

```
src/
├── app/                 # Next.js 14 App Router
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Protected dashboard pages
│   └── page.tsx        # Landing page
├── components/         # Reusable UI components
│   └── ui/            # Base UI components
├── lib/               # Utility libraries
│   ├── auth.ts        # NextAuth configuration
│   ├── prisma.ts      # Prisma client
│   └── validations.ts # Zod schemas
prisma/
├── schema.prisma      # Database schema
└── seed.ts           # Database seeding
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:seed` - Seed database with demo data

## Database Setup

The project uses SQLite for development with Prisma ORM:

1. **Push schema to database**:
   ```bash
   npm run db:push
   ```

2. **Seed with demo data**:
   ```bash
   npm run db:seed
   ```

## Stripe Integration

This demo includes Stripe integration placeholders. To enable real payments:

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. Update environment variables with real keys
4. Configure webhook endpoints in Stripe dashboard
5. Update price IDs in the billing components

## Security Features

- Input validation with Zod schemas
- Password hashing with bcrypt
- CSRF protection via NextAuth
- Rate limiting on authentication endpoints
- Stripe webhook signature verification
- Environment variable validation

## Deployment

This application is optimized for deployment on Vercel:

1. Push your code to a Git repository
2. Connect the repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

For production database, consider:
- PostgreSQL on Railway, Supabase, or Planetscale
- Update `DATABASE_URL` environment variable

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or issues, please open a GitHub issue or contact the development team.
