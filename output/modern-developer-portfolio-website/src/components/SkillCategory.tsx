interface Skill {
  name: string
  level: number
}

interface SkillCategoryProps {
  category: {
    title: string
    skills: Skill[]
  }
}

export default function SkillCategory({ category }: SkillCategoryProps) {
  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-6">{category.title}</h3>
      <div className="space-y-4">
        {category.skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{skill.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}