# EduCenter - Online Learning Platform

A comprehensive educational platform built with Next.js 14, featuring course management, user authentication, and payment processing.

## Features

- 🎓 Course catalog and details
- 👨‍🏫 Instructor profiles
- 🔐 User authentication with NextAuth.js
- 💳 Payment processing with Stripe
- 📊 Student portal and dashboard
- 📱 Responsive design with Tailwind CSS
- 🗄️ SQLite database with Prisma ORM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Seed the database (optional):
```bash
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The following environment variables are included in `.env.local` with demo values:

- `DATABASE_URL` - SQLite database file path
- `NEXTAUTH_SECRET` - NextAuth.js secret key
- `NEXTAUTH_URL` - Base URL for authentication
- `STRIPE_PUBLISHABLE_KEY` - Stripe public key (demo)
- `STRIPE_SECRET_KEY` - Stripe secret key (demo)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                 # Utility libraries
└── globals.css         # Global styles
```

## Key Pages

- `/` - Landing page with hero, stats, and featured courses
- `/courses` - Course catalog with filtering
- `/courses/[id]` - Individual course details
- `/instructors` - Instructor profiles
- `/about` - About page with mission and team
- `/contact` - Contact form
- `/portal` - Student dashboard (requires authentication)

## Authentication

The app uses NextAuth.js with a credentials provider for demo purposes. In production, you should integrate with proper OAuth providers or implement secure password handling.

## Payment Processing

Stripe integration is included for course enrollment. The demo uses test keys - replace with real Stripe keys for production use.

## Database

The app uses SQLite for simplicity. The database schema includes:

- Users and authentication tables
- Courses with details and pricing
- Enrollments linking users to courses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.