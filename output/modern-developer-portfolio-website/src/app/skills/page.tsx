import SkillCategory from '@/components/SkillCategory'

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Vue.js', level: 75 },
      { name: 'JavaScript', level: 95 }
    ]
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'FastAPI', level: 75 },
      { name: 'GraphQL', level: 70 },
      { name: 'REST APIs', level: 92 }
    ]
  },
  {
    title: 'Database & Tools',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 78 },
      { name: 'Git', level: 95 }
    ]
  },
  {
    title: 'Design & Others',
    skills: [
      { name: 'UI/UX Design', level: 85 },
      { name: 'Figma', level: 80 },
      { name: 'Testing', level: 82 },
      { name: 'Agile', level: 90 },
      { name: 'Team Leadership', level: 85 },
      { name: 'Problem Solving', level: 95 }
    ]
  }
]

export default function SkillsPage() {
  return (
    <div className="section-padding max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Skills & Expertise</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Here are the technologies and skills I've mastered throughout my career. 
          I'm always learning and expanding my toolkit.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <SkillCategory key={index} category={category} />
        ))}
      </div>
    </div>
  )
}