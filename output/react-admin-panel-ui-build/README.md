# React Admin Panel UI

A modern, responsive admin panel built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 📊 **Dashboard**: Overview with key metrics and charts
- 👥 **User Management**: Comprehensive user administration
- 📈 **Analytics**: Detailed analytics and insights
- 📋 **Reports**: Generate and view various reports
- ⚙️ **Settings**: System configuration and preferences
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 📱 **Responsive**: Mobile-first design approach
- 🔍 **TypeScript**: Full type safety

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Prisma** - Database ORM
- **SQLite** - Development database

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── dashboard/       # Dashboard page
│   ├── users/          # User management
│   ├── analytics/      # Analytics page
│   ├── reports/        # Reports page
│   ├── settings/       # Settings page
│   └── globals.css     # Global styles
├── components/         # Reusable components
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── StatsCard.tsx   # Statistics card
│   ├── ChartCard.tsx   # Chart component
│   └── UserTable.tsx   # User management table
└── lib/                # Utility functions
    └── utils.ts        # Helper utilities
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_NAME="Admin Panel"
```

## License

MIT License - feel free to use this project for your own purposes.