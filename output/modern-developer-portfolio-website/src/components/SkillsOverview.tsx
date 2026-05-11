import { Code, Database, Smartphone, Cloud } from 'lucide-react'

const skillCategories = [
  {
    icon: Code,
    title: 'Frontend Development',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    description: 'Creating beautiful and interactive user interfaces'
  },
  {
    icon: Database,
    title: 'Backend Development', 
    skills: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL'],
    description: 'Building scalable server-side applications'
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    description: 'Cross-platform mobile app development'
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    description: 'Deploying and maintaining applications at scale'
  }
]

export default function SkillsOverview() {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I specialize in modern web technologies and have experience across the full stack.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <div key={index} className="card text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                  <IconComponent className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}