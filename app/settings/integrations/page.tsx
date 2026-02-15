'use client'

import { ApiKeyManager } from '@/components/settings/api-key-manager'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your favorite tools and services to Reflect
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Your API keys are encrypted and stored securely</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🔒</div>
                <div>
                  <h4 className="font-medium">End-to-End Encryption</h4>
                  <p className="text-sm text-muted-foreground">All keys are encrypted in transit and at rest</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">👀</div>
                <div>
                  <h4 className="font-medium">Limited Visibility</h4>
                  <p className="text-sm text-muted-foreground">Keys are hidden by default and only visible to you</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🗑️</div>
                <div>
                  <h4 className="font-medium">Easy Revocation</h4>
                  <p className="text-sm text-muted-foreground">Delete keys instantly at any time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <ApiKeyManager />
        </div>
      </div>
    </main>
  )
}
