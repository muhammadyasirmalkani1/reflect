'use client'

import { useState } from 'react'
import { Eye, EyeOff, Copy, Trash2, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface ApiKey {
  id: string
  name: string
  key: string
  service: string
  createdAt: string
  lastUsed?: string
  isVisible: boolean
}

const INTEGRATIONS = [
  { name: 'OpenAI', icon: '🤖', description: 'GPT models and AI features' },
  { name: 'GitHub', icon: '🐙', description: 'Repository and code integration' },
  { name: 'Stripe', icon: '💳', description: 'Payment processing' },
  { name: 'SendGrid', icon: '📧', description: 'Email delivery' },
  { name: 'Analytics', icon: '📊', description: 'Usage tracking and analytics' },
  { name: 'Slack', icon: '💬', description: 'Notifications and messaging' },
]

export function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'OpenAI Production',
      key: 'sk-proj-...xxxxx',
      service: 'OpenAI',
      createdAt: '2024-01-15',
      lastUsed: '2024-02-15',
      isVisible: false,
    },
  ])
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyValue, setNewKeyValue] = useState('')
  const [selectedService, setSelectedService] = useState('')

  const toggleKeyVisibility = (id: string) => {
    setApiKeys(
      apiKeys.map((key) =>
        key.id === id ? { ...key, isVisible: !key.isVisible } : key
      )
    )
  }

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))
  }

  const addNewKey = () => {
    if (newKeyName && newKeyValue && selectedService) {
      const newKey: ApiKey = {
        id: Date.now().toString(),
        name: newKeyName,
        key: newKeyValue,
        service: selectedService,
        createdAt: new Date().toLocaleDateString(),
        isVisible: false,
      }
      setApiKeys([...apiKeys, newKey])
      setNewKeyName('')
      setNewKeyValue('')
      setSelectedService('')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">API Keys</h2>
        <p className="text-muted-foreground">Manage your integration API keys securely</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INTEGRATIONS.map((integration) => (
          <Dialog key={integration.name}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:border-primary transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">{integration.icon}</div>
                    <Badge variant="outline">Add Key</Badge>
                  </div>
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                  <CardDescription className="text-xs">{integration.description}</CardDescription>
                </CardHeader>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add {integration.name} API Key</DialogTitle>
                <DialogDescription>
                  Securely store your API key for {integration.name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Key Name</label>
                  <Input
                    placeholder="e.g., Production API Key"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">API Key</label>
                  <Input
                    type="password"
                    placeholder="Paste your API key here"
                    value={newKeyValue}
                    onChange={(e) => setNewKeyValue(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => {
                    setSelectedService(integration.name)
                    addNewKey()
                  }}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add API Key
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active API Keys</CardTitle>
          <CardDescription>Your stored API keys and credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No API keys configured yet</p>
            ) : (
              apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{key.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        {key.service}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Created: {key.createdAt}
                      {key.lastUsed && ` • Last used: ${key.lastUsed}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm bg-muted px-3 py-1 rounded">
                      {key.isVisible ? key.key : '•'.repeat(12)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility(key.id)}
                    >
                      {key.isVisible ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(key.key)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteKey(key.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
