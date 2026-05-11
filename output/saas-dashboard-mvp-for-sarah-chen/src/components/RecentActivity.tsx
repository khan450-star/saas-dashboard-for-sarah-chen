export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'upgraded to Pro plan',
      time: '2 hours ago'
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'signed up',
      time: '4 hours ago'
    },
    {
      id: 3,
      user: 'Bob Johnson',
      action: 'updated profile',
      time: '6 hours ago'
    },
    {
      id: 4,
      user: 'Alice Brown',
      action: 'canceled subscription',
      time: '1 day ago'
    }
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full" />
              </div>
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