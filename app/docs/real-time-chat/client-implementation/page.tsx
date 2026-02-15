'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ClientImplementationPage() {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/docs/real-time-chat/server-setup" className="text-purple-400 hover:text-purple-300 flex items-center mb-2">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Server Setup
        </Link>
        <h1 className="text-4xl font-bold mb-6">Client Implementation</h1>
        <p className="text-xl text-gray-300 mb-6">
          Learn how to implement the client-side components of a real-time chat system in your React application.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Socket.IO Client Setup</CardTitle>
            <CardDescription>The client-side implementation involves connecting to the WebSocket server and managing chat state.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Installation</h4>
              <pre className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                <code>npm install socket.io-client</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Socket Service</CardTitle>
            <CardDescription>Create a reusable socket service for your application</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto text-xs">
              <code>{String.raw`// lib/socket-service.ts
import io from 'socket.io-client'

class SocketService {
  private socket = null

  connect() {
    this.socket = io('http://localhost:4000')
  }

  sendMessage(content) {
    if (this.socket) {
      this.socket.emit('send-message', content)
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }
}

export default new SocketService()`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>React Chat Hook</CardTitle>
            <CardDescription>Custom hook for managing chat state</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto text-xs">
              <code>{String.raw`// hooks/use-chat.ts
import { useState, useEffect } from 'react'
import socket from '@/lib/socket-service'

export function useChat(roomId) {
  const [messages, setMessages] = useState([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    socket.connect()
    setConnected(true)

    socket.on('message', (msg) => {
      setMessages(prev => [...prev, msg])
    })
  }, [])

  return { messages, connected }
}`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Advanced Features</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• File attachments and media</li>
                <li>• Typing indicators</li>
                <li>• Read receipts</li>
                <li>• User presence</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Performance</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Message pagination</li>
                <li>• Optimistic updates</li>
                <li>• Connection retry logic</li>
                <li>• Offline queuing</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
