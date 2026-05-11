# Modern Developer Portfolio Website

A sleek, responsive developer portfolio built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✨ Modern, clean design with dark mode support
- 📱 Fully responsive across all devices
- 🚀 Built with Next.js 14 App Router
- 💎 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📧 Contact form with validation
- 📝 Blog section ready for content
- 🖼️ Optimized images with Next.js Image component
- ⚡ Fast loading and SEO optimized

## Pages

- **Home**: Hero section with featured projects and skills overview
- **About**: Personal story, experience, and journey
- **Projects**: Showcase of development projects with live demos
- **Skills**: Technical skills and expertise levels
- **Blog**: Articles and insights (ready for CMS integration)
- **Contact**: Contact form and social links

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Images**: Next.js Image optimization
- **Animations**: CSS transitions and transforms

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modern-developer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # App Router pages
│   ├── about/          # About page
│   ├── blog/           # Blog listing
│   ├── contact/        # Contact page
│   ├── projects/       # Projects showcase
│   ├── skills/         # Skills and expertise
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
└── components/          # Reusable components
    ├── Navigation.tsx   # Main navigation
    ├── Footer.tsx       # Site footer
    ├── Hero.tsx         # Hero section
    ├── ProjectCard.tsx  # Project display card
    ├── ContactForm.tsx  # Contact form
    └── ...
```

## Customization

### Personal Information

1. **Update personal details** in:
   - `src/app/layout.tsx` (metadata)
   - `src/components/Hero.tsx` (name and description)
   - `src/components/Footer.tsx` (contact info)
   - `src/app/about/page.tsx` (biography and experience)

### Projects

1. **Add your projects** in:
   - `src/app/projects/page.tsx`
   - `src/components/FeaturedProjects.tsx`

2. **Update project data** with:
   - Project titles and descriptions
   - Technology stacks
   - Live demo URLs
   - GitHub repository links
   - Project images

### Skills

1. **Modify skills** in:
   - `src/app/skills/page.tsx`
   - `src/components/SkillsOverview.tsx`

### Styling

1. **Colors**: Update the color palette in `tailwind.config.js`
2. **Fonts**: Change fonts in `src/app/globals.css`
3. **Components**: Customize component styles in individual files

### Contact Form

The contact form is ready for integration with:
- Email services (EmailJS, Resend, etc.)
- Serverless functions
- Contact form APIs

Update the form submission logic in `src/components/ContactForm.tsx`.

## Content Management

The portfolio is ready for CMS integration with:
- **Contentful**: For blog posts and project content
- **Strapi**: Self-hosted headless CMS
- **Sanity**: Real-time collaborative CMS

## Deployment

The portfolio can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** containers

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## Performance

- ✅ Optimized images with Next.js Image
- ✅ Static generation for fast loading
- ✅ Minimal JavaScript bundle
- ✅ Efficient CSS with Tailwind
- ✅ SEO-friendly structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this portfolio template for your own projects.

---

**Built with ❤️ using Next.js and modern web technologies**