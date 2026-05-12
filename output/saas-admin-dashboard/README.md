# SaaS Admin Dashboard

A modern SaaS admin dashboard built with Next.js 14, featuring user authentication, subscription billing, and a responsive design.

## Features

- 🔐 **Authentication**: Sign up/sign in with NextAuth.js
- 💳 **Billing**: Stripe integration for subscription management
- 📊 **Dashboard**: Analytics and metrics display
- ⚙️ **Settings**: User profile management
- 📱 **Responsive**: Mobile-first design with Tailwind CSS
- 🔒 **Security**: Input validation with Zod, password hashing

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: NextAuth.js 4.x
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS 3.4
- **Payments**: Stripe
- **Validation**: Zod
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd saas-admin-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

- **Email**: test@example.com
- **Password**: password123

## Environment Variables

The following environment variables are pre-configured for local development:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="dev-secret-key-change-in-production"
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY="sk_test_placeholder"
STRIPE_PUBLISHABLE_KEY="pk_test_placeholder"
STRIPE_WEBHOOK_SECRET="whsec_placeholder"
```

For production, update these values with real credentials.

## Project Structure

```
src/
├── app/                   # Next.js 14 App Router pages
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── ui/              # UI components
│   └── dashboard/       # Dashboard-specific components
└── lib/                 # Utilities and configurations
    ├── auth.ts          # NextAuth configuration
    ├── prisma.ts        # Prisma client
    └── validations/     # Zod schemas
```

## Database Schema

The application uses the following main models:

- **User**: User accounts with authentication
- **Account/Session**: NextAuth session management
- **Subscription**: User subscription plans and billing

## API Routes

- `POST /api/auth/signup` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth handlers
- `PUT /api/user/profile` - Update user profile
- `GET /api/subscription` - Get user subscription
- `POST /api/stripe/checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## Stripe Integration

To enable Stripe payments:

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Update the environment variables:
   ```env
   STRIPE_SECRET_KEY="sk_test_your_key_here"
   STRIPE_PUBLISHABLE_KEY="pk_test_your_key_here"
   STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
   ```
4. Set up webhook endpoints in your Stripe dashboard pointing to `/api/stripe/webhook`

## Deployment

This application is designed to deploy easily on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

For database, consider upgrading from SQLite to PostgreSQL for production using Vercel Postgres or Supabase.

## Security Features

- ✅ Password hashing with bcrypt
- ✅ Input validation with Zod
- ✅ CSRF protection (NextAuth built-in)
- ✅ SQL injection prevention (Prisma ORM)
- ✅ Environment variable validation
- ✅ Secure session management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
