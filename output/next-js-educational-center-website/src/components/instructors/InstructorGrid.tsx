const instructors = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    expertise: 'Web Development & JavaScript',
    experience: '12 years',
    students: '15,000+',
    rating: 4.9,
    courses: 8,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612c7d3?w=300&h=300&fit=crop&crop=face',
    bio: 'Former Senior Engineer at Google with expertise in modern web technologies.'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    expertise: 'Data Science & Machine Learning',
    experience: '15 years',
    students: '12,000+',
    rating: 4.8,
    courses: 6,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    bio: 'PhD in Computer Science, published researcher in AI and machine learning.'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    expertise: 'UI/UX Design & Product',
    experience: '10 years',
    students: '8,500+',
    rating: 4.9,
    courses: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    bio: 'Lead Designer at top tech companies, specializing in user-centered design.'
  },
  {
    id: '4',
    name: 'David Thompson',
    expertise: 'Cloud Computing & DevOps',
    experience: '14 years',
    students: '10,000+',
    rating: 4.7,
    courses: 7,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: 'AWS Solutions Architect with extensive experience in cloud infrastructure.'
  },
  {
    id: '5',
    name: 'Lisa Johnson',
    expertise: 'Digital Marketing & Strategy',
    experience: '9 years',
    students: '6,000+',
    rating: 4.8,
    courses: 4,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
    bio: 'Marketing Director with proven track record in digital growth strategies.'
  },
  {
    id: '6',
    name: 'Robert Kim',
    expertise: 'Mobile App Development',
    experience: '11 years',
    students: '9,200+',
    rating: 4.9,
    courses: 6,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
    bio: 'Senior iOS/Android developer with apps downloaded millions of times.'
  }
]

export function InstructorGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {instructors.map((instructor) => (
        <div key={instructor.id} className="card hover:shadow-lg transition-shadow duration-300">
          <div className="p-6 text-center">
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {instructor.name}
            </h3>
            
            <p className="text-primary-600 font-medium mb-3">
              {instructor.expertise}
            </p>
            
            <p className="text-gray-600 text-sm mb-4">
              {instructor.bio}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <div className="font-semibold text-gray-900">{instructor.experience}</div>
                <div className="text-gray-600">Experience</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{instructor.students}</div>
                <div className="text-gray-600">Students</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{instructor.rating}⭐</div>
                <div className="text-gray-600">Rating</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{instructor.courses}</div>
                <div className="text-gray-600">Courses</div>
              </div>
            </div>
            
            <button className="w-full btn-primary">
              View Courses
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}