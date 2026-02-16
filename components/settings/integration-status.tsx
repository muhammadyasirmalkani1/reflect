'use client'

import { CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Integration {
  name: string
  icon: string
  status: 'connected' | 'pending' | 'disconnected'
  lastSync?: string
  description: string
}

const INTEGRATIONS: Integration[] = [
  {
    name: 'OpenAI',
    icon: '🤖',
    status: 'connected',
    lastSync: '2 minutes ago',
    description: 'AI-powered features and suggestions',
  },
  {
    name: 'GitHub',
    icon: '🐙',
    status: 'connected',
    lastSync: '1 hour ago',
    description: 'Code snippets and repository access',
  },
  {
    name: 'Stripe',
    icon: '💳',
    status: 'connected',
    lastSync: 'Just now',
    description: 'Payment processing and subscriptions',
  },
  {
    name: 'SendGrid',
    icon: '📧',
    status: 'pending',
    description: 'Email notifications and delivery',
  },
  {
    name: 'Slack',
    icon: '💬',
    status: 'disconnected',
    description: 'Team notifications and alerts',
  },
  {
    name: 'Analytics',
    icon: '📊',
    status: 'connected',
    lastSync: '5 minutes ago',
    description: 'Usage tracking and insights',
  },
]

function getStatusIcon(status: string) {
  switch (status) {
    case 'connected':
      return <CheckCircle className="w-5 h-5 text-green-500" />
    case 'pending':
      return <Clock className="w-5 h-5 text-yellow-500" />
    case 'disconnected':
      return <AlertCircle className="w-5 h-5 text-gray-400" />
    default:
      return null
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'connected':
      return <Badge className="bg-green-500">Connected</Badge>
    case 'pending':
      return <Badge className="bg-yellow-500">Pending</Badge>
    case 'disconnected':
      return <Badge variant="outline">Disconnected</Badge>
    default:
      return null
  }
}

export function IntegrationStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Status</CardTitle>
        <CardDescription>Real-time status of all connected services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {INTEGRATIONS.map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-3xl">{integration.icon}</div>
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    {integration.name}
                    <span className="text-xs">{getStatusIcon(integration.status)}</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                  {integration.lastSync && (
                    <p className="text-xs text-muted-foreground mt-1">Last sync: {integration.lastSync}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(integration.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
