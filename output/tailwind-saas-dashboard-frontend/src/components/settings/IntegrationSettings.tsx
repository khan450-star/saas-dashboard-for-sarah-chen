export default function IntegrationSettings() {
  const integrations = [
    {
      name: 'Slack',
      description: 'Send notifications to Slack channels',
      connected: true,
      logo: '💬',
    },
    {
      name: 'Google Analytics',
      description: 'Track website analytics and user behavior',
      connected: false,
      logo: '📊',
    },
    {
      name: 'Stripe',
      description: 'Process payments and manage subscriptions',
      connected: true,
      logo: '💳',
    },
    {
      name: 'SendGrid',
      description: 'Send transactional and marketing emails',
      connected: false,
      logo: '📧',
    },
  ]

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Integrations</h3>
      
      <div className="space-y-4">
        {integrations.map((integration, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{integration.logo}</span>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{integration.name}</h4>
                  <p className="text-sm text-gray-500">{integration.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  integration.connected 
                    ? 'bg-success-100 text-success-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {integration.connected ? 'Connected' : 'Not Connected'}
                </span>
                
                <button className={`btn ${
                  integration.connected ? 'btn-secondary' : 'btn-primary'
                }`}>
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}