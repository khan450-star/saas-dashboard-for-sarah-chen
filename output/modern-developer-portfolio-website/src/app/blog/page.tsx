import BlogCard from '@/components/BlogCard'

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js 14',
    excerpt: 'Learn about the latest features in Next.js 14 and how to build modern web applications.',
    date: '2023-12-01',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    tags: ['Next.js', 'React', 'Web Development']
  },
  {
    id: 2,
    title: 'TypeScript Best Practices for React',
    excerpt: 'Discover essential TypeScript patterns and best practices when building React applications.',
    date: '2023-11-28',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    tags: ['TypeScript', 'React', 'Best Practices']
  },
  {
    id: 3,
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Learn how to design and implement scalable REST APIs using Node.js and Express.',
    date: '2023-11-25',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    tags: ['Node.js', 'API', 'Backend']
  },
  {
    id: 4,
    title: 'Modern CSS Techniques with Tailwind',
    excerpt: 'Explore advanced CSS techniques and how Tailwind CSS can streamline your styling workflow.',
    date: '2023-11-20',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    tags: ['CSS', 'Tailwind', 'Frontend']
  },
  {
    id: 5,
    title: 'Database Design Patterns',
    excerpt: 'Understanding common database design patterns and when to use them in your applications.',
    date: '2023-11-15',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop',
    tags: ['Database', 'PostgreSQL', 'Design Patterns']
  },
  {
    id: 6,
    title: 'Deploying to Production: A Complete Guide',
    excerpt: 'Step-by-step guide to deploying your web applications to production environments.',
    date: '2023-11-10',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
    tags: ['Deployment', 'DevOps', 'Production']
  }
]

export default function BlogPage() {
  return (
    <div className="section-padding max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Insights, tutorials, and thoughts on web development, technology, and best practices.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}