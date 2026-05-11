export default function InvoiceTable() {
  const invoices = [
    { id: 'INV-001', date: '2024-01-01', amount: '$79.00', status: 'Paid' },
    { id: 'INV-002', date: '2023-12-01', amount: '$79.00', status: 'Paid' },
    { id: 'INV-003', date: '2023-11-01', amount: '$79.00', status: 'Paid' },
    { id: 'INV-004', date: '2023-10-01', amount: '$79.00', status: 'Paid' },
    { id: 'INV-005', date: '2023-09-01', amount: '$79.00', status: 'Failed' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-success-100 text-success-600'
      case 'Failed': return 'bg-danger-100 text-danger-600'
      case 'Pending': return 'bg-warning-100 text-warning-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {invoice.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {invoice.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {invoice.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-primary-600 hover:text-primary-900">
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}