import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  tags: string[]
}

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="card group hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {post.readTime}
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
        <Link href={`/blog/${post.id}`}>
          {post.title}
        </Link>
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Link 
        href={`/blog/${post.id}`}
        className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 group"
      >
        Read More
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </article>
  )
}