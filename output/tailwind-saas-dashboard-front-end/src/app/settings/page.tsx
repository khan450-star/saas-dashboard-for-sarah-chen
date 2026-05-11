import SettingsForm from '@/components/SettingsForm'

export default function Settings() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              <a href="#" className="sidebar-link active">
                General
              </a>
              <a href="#" className="sidebar-link">
                Security
              </a>
              <a href="#" className="sidebar-link">
                Notifications
              </a>
              <a href="#" className="sidebar-link">
                API Keys
              </a>
            </nav>
          </div>
          
          <div className="lg:col-span-2">
            <SettingsForm />
          </div>
        </div>
      </div>
    </div>
  )
}