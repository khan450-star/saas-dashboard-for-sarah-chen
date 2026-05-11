# React Dashboard Application

A modern dashboard application built with Next.js, TypeScript, and Tailwind CSS featuring data visualization, form handling, and analytics integration.

## Features

- 📊 Data Visualization Dashboard
- ⚙️ Settings Management
- 📱 Responsive Design
- 🔧 Component Library
- 📈 PostHog Analytics Integration
- ✨ Form Validation with React Hook Form

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Analytics**: PostHog
- **Icons**: Lucide React

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable components
- `src/lib/` - Utility functions and configurations
- `src/types/` - TypeScript type definitions

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```