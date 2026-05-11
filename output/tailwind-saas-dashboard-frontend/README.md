# SaaS Dashboard Frontend

A modern, responsive SaaS dashboard built with Next.js 14, Tailwind CSS, and TypeScript.

## Features

- 📊 **Dashboard Overview** - Key metrics and analytics
- 📈 **Analytics** - Detailed analytics with interactive charts
- 👥 **User Management** - Complete user management interface
- ⚙️ **Settings** - Application configuration and preferences
- 💳 **Billing** - Subscription and billing management
- 📄 **Reports** - Generate and download detailed reports
- 🔐 **Authentication** - Secure user authentication
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Charts**: Chart.js with react-chartjs-2
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma (SQLite for development)
- **Icons**: Lucide React

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── dashboard/      # Dashboard pages
│   ├── auth/           # Authentication pages
│   └── api/            # API routes
├── components/         # React components
│   ├── layout/        # Layout components
│   ├── ui/            # Reusable UI components
│   ├── dashboard/     # Dashboard-specific components
│   ├── analytics/     # Analytics components
│   ├── users/         # User management components
│   ├── settings/      # Settings components
│   ├── billing/       # Billing components
│   └── reports/       # Reports components
└── ...
```

## Pages

- **Dashboard** (`/dashboard`) - Overview with key metrics and charts
- **Analytics** (`/dashboard/analytics`) - Detailed analytics and data visualization
- **Users** (`/dashboard/users`) - User management with search and filters
- **Settings** (`/dashboard/settings`) - Application settings and configuration
- **Billing** (`/dashboard/billing`) - Subscription plans and billing management
- **Reports** (`/dashboard/reports`) - Report generation and download
- **Sign In** (`/auth/signin`) - User authentication

## Key Features

### Dashboard Overview
- Real-time statistics cards
- Interactive charts for revenue, user growth, and performance
- Recent activity feed

### Analytics
- Comprehensive metrics dashboard
- Multiple chart types (line, bar, doughnut, polar area)
- Date range filtering
- Top pages and device analytics

### User Management
- User table with search and filtering
- Add, edit, and delete users
- Role-based access control
- User status management

### Settings
- General application settings
- Security configuration
- Notification preferences
- Third-party integrations

### Billing
- Subscription plan comparison
- Usage tracking and limits
- Invoice history
- Payment method management

### Reports
- Generate various report types
- Download in multiple formats
- Report analytics and trends
- Scheduled report generation

## Development

The project uses:
- **Next.js 14** with App Router for optimal performance
- **Tailwind CSS** for utility-first styling
- **TypeScript** for type safety
- **Chart.js** for data visualization
- **NextAuth.js** for authentication

## Deployment

To build for production:

```bash
npm run build
npm start
```

The application is optimized for deployment on Vercel, Netlify, or any Node.js hosting platform.

## License

MIT License - see LICENSE file for details.