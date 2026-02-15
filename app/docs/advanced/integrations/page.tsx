'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap } from "lucide-react"

export default function IntegrationsPage() {
  const integrations = [
    {
      name: "Notion",
      description: "Sync your notes and databases with Notion workspaces",
      category: "Productivity",
      status: "Available",
      features: ["Two-way sync", "Database import", "Page templates"],
    },
    {
      name: "Obsidian",
      description: "Import your Obsidian vault and maintain graph connections",
      category: "Note-taking",
      status: "Available",
      features: ["Vault import", "Link preservation", "Plugin compatibility"],
    },
    {
      name: "Google Drive",
      description: "Access and sync documents from Google Drive",
      category: "Cloud Storage",
      status: "Available",
      features: ["Document sync", "Real-time collaboration", "Version history"],
    },
    {
      name: "Slack",
      description: "Share insights and collaborate with team members",
      category: "Communication",
      status: "Beta",
      features: ["Message sharing", "Channel integration", "Bot commands"],
    },
    {
      name: "Zapier",
      description: "Automate workflows with 5000+ apps",
      category: "Automation",
      status: "Available",
      features: ["Trigger automation", "Data transformation", "Multi-step workflows"],
    },
  ]

  const getStatusColor = (status: string): string => {
    if (status === "Available") return "bg-green-100 text-green-800"
    if (status === "Beta") return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Integrations</h1>
        <p className="text-xl text-muted-foreground">
          Connect Reflect with your favorite tools and services.
        </p>
      </div>

      <Alert>
        <Zap className="h-4 w-4" />
        <AlertDescription>
          New integrations are added regularly. Request specific integrations through our support channel.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {integrations.map((integration) => (
          <Card key={integration.name}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Category</h4>
                <Badge variant="outline">{integration.category}</Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {integration.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
