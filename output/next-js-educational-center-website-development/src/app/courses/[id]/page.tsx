import { CourseDetails } from '@/components/CourseDetails'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface CoursePageProps {
  params: {
    id: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      enrollments: true
    }
  })

  if (!course) {
    notFound()
  }

  return <CourseDetails course={course} />
}