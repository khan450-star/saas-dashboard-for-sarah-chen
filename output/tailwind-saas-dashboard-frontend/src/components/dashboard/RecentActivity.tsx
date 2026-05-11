export default function RecentActivity() {
  const activities = [
    { user: 'John Doe', action: 'Created new project', time: '2 min ago' },
    { user: 'Jane Smith', action: 'Updated user profile', time: '5 min ago' },
    { user: 'Bob Johnson', action: 'Deleted old files', time: '15 min ago' },
    { user: 'Alice Brown', action: 'Added new team member', time: '1 hour ago' },
    { user: 'Charlie Wilson', action: 'Generated report', time: '2 hours ago' },
  ]

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-primary-600">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}