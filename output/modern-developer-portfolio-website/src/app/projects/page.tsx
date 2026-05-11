import ProjectCard from '@/components/ProjectCard'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform built with Next.js, Stripe, and PostgreSQL.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/johndoe/ecommerce'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/johndoe/taskmanager'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with forecasts, maps, and historical data.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
    technologies: ['Vue.js', 'Chart.js', 'Weather API', 'CSS3'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/johndoe/weather'
  },
  {
    id: 4,
    title: 'Social Media Analytics',
    description: 'An analytics platform for social media metrics with data visualization.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/johndoe/analytics'
  },
  {
    id: 5,
    title: 'Recipe Finder',
    description: 'A recipe discovery app with ingredient-based search and meal planning.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    technologies: ['React Native', 'Firebase', 'Recipe API', 'Redux'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/johndoe/recipes'
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'A modern developer portfolio with blog integration and contact forms.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Contentful'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/johndoe/portfolio'
  }
]

export default function ProjectsPage() {
  return (
    <div className="section-padding max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Here's a collection of projects I've worked on. Each one represents a unique challenge 
          and learning experience in my development journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}