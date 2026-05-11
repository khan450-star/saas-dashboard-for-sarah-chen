interface ReportCardProps {
  title: string
  description: string
  lastGenerated: string
  format: string
  size: string
}

export default function ReportCard({ title, description, lastGenerated, format, size }: ReportCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded ${
          format === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
        }`}>
          {format}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span>Generated {lastGenerated}</span>
        <span>{size}</span>
      </div>
      
      <div className="flex space-x-2">
        <button className="flex-1 btn btn-primary text-xs">
          Download
        </button>
        <button className="flex-1 btn btn-secondary text-xs">
          Regenerate
        </button>
      </div>
    </div>
  )
}