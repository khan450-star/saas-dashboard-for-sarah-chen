'use client'

interface SettingsTabProps {
  id: string
  label: string
  icon: string
  isActive: boolean
  onClick: (id: string) => void
}

export default function SettingsTab({ id, label, icon, isActive, onClick }: SettingsTabProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-primary-100 text-primary-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <span className="mr-3 text-sm">{icon}</span>
      {label}
    </button>
  )
}