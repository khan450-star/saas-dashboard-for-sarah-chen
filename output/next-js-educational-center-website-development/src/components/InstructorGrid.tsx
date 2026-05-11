export default function InstructorGrid() {
  const instructors = [
    {
      name: 'Sarah Johnson',
      expertise: 'Web Development',
      experience: '8 years',
      students: '15,000+',
      courses: 12,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=300',
      bio: 'Full-stack developer and coding bootcamp instructor with expertise in React, Node.js, and modern web technologies.'
    },
    {
      name: 'Dr. Emily Davis',
      expertise: 'Data Science',
      experience: '12 years',
      students: '22,000+',
      courses: 8,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      bio: 'Former Google data scientist with PhD in Statistics. Specializes in machine learning and data visualization.'
    },
    {
      name: 'Mike Chen',
      expertise: 'Mobile Development',
      experience: '10 years',
      students: '18,500+',
      courses: 15,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      bio: 'Senior iOS and Android developer who has built apps for Fortune 500 companies and startups.'
    },
    {
      name: 'Jessica Wang',
      expertise: 'UX/UI Design',
      experience: '7 years',
      students: '12,000+',
      courses: 10,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      bio: 'Award-winning designer with experience at top design agencies. Passionate about user-centered design.'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {instructors.map((instructor, index) => (
        <div key={index} className="card p-6 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {instructor.name}
          </h3>
          
          <p className="text-primary-600 font-medium mb-3">
            {instructor.expertise}
          </p>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {instructor.bio}
          </p>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Experience:</span>
              <span className="font-medium">{instructor.experience}</span>
            </div>
            <div className="flex justify-between">
              <span>Students:</span>
              <span className="font-medium">{instructor.students}</span>
            </div>
            <div className="flex justify-between">
              <span>Courses:</span>
              <span className="font-medium">{instructor.courses}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export { InstructorGrid }