"Client";

import React from "react";

import express, { json } from "express"
import { createServer } from "http"
import { Server, OPEN } from "ws"
import cors from "cors"
import { generateData } from "./data-generators"

// Initialize Express app
const app = express()
app.use(cors())
app.use(json())

// Create HTTP server
const server = createServer(app)

// Create WebSocket server
const wss = new Server({ server })

// Store connected clients
const clients = new Map()

// WebSocket message types - must match frontend types
const WS_MESSAGE_TYPES = {
  PERFORMANCE_METRICS: "performance_metrics",
  CPU_USAGE: "cpu_usage",
  MEMORY_USAGE: "memory_usage",
  ACTIVE_USERS: "active_users",
  USER_ACTIVITY: "user_activity",
  USERS_BY_COUNTRY: "users_by_country",
  REALTIME_EVENTS: "realtime_events",
  SYSTEM_ALERTS: "system_alerts",
}

// Handle WebSocket connections
wss.on("connection", (ws, req) => {
  const clientId = req.headers["sec-websocket-key"] || Date.now().toString()
  const clientInfo = {
    id: clientId,
    ws,
    isAlive: true,
    subscriptions: Object.values(WS_MESSAGE_TYPES), // Subscribe to all by default
  }

  clients.set(clientId, clientInfo)
  console.log(`Client connected: ${clientId}. Total clients: ${clients.size}`)

  // Send welcome message
  ws.send(
    JSON.stringify({
      type: "connection_established",
      data: {
        clientId,
        message: "Connected to WebSocket server",
        timestamp: new Date().toISOString(),
      },
    }),
  )

  // Handle messages from client
  ws.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message)
      console.log(`Received message from ${clientId}:`, parsedMessage)

      // Handle different message types
      switch (parsedMessage.type) {
        case "init":
          // Client initialization
          ws.send(
            JSON.stringify({
              type: "init_response",
              data: {
                status: "connected",
                clientId: parsedMessage.clientId || clientId,
                serverTime: new Date().toISOString(),
              },
            }),
          )
          break

        case "subscribe":
          // Subscribe to specific data types
          if (Array.isArray(parsedMessage.channels)) {
            clientInfo.subscriptions = parsedMessage.channels
            ws.send(
              JSON.stringify({
                type: "subscription_update",
                data: {
                  subscriptions: clientInfo.subscriptions,
                  message: "Subscription updated",
                },
              }),
            )
          }
          break

        case "ping":
          // Respond to ping
          ws.send(
            JSON.stringify({
              type: "pong",
              data: {
                timestamp: new Date().toISOString(),
              },
            }),
          )
          break

        default:
          console.log(`Unknown message type: ${parsedMessage.type}`)
      }
    } catch (error) {
      console.error("Error processing message:", error)
    }
  })

  // Handle client disconnect
  ws.on("close", () => {
    clients.delete(clientId)
    console.log(`Client disconnected: ${clientId}. Remaining clients: ${clients.size}`)
  })

  // Handle errors
  ws.on("error", (error) => {
    console.error(`WebSocket error for client ${clientId}:`, error)
    clients.delete(clientId)
  })

  // Set up ping-pong to detect disconnected clients
  ws.isAlive = true
  ws.on("pong", () => {
    ws.isAlive = true
  })
})

// Ping all clients periodically to check if they're still connected
const pingInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      return ws.terminate()
    }

    ws.isAlive = false
    ws.ping()
  })
}, 30000)

// Clean up interval on server close
wss.on("close", () => {
  clearInterval(pingInterval)
})

// Set up data generators and broadcasting
const setupDataGenerators = () => {
  // CPU Usage - every 2 seconds
  setInterval(() => {
    const data = generateData.cpuUsage()
    broadcastToSubscribers(WS_MESSAGE_TYPES.CPU_USAGE, data)
  }, 2000)

  // Memory Usage - every 2 seconds
  setInterval(() => {
    const data = generateData.memoryUsage()
    broadcastToSubscribers(WS_MESSAGE_TYPES.MEMORY_USAGE, data)
  }, 2000)

  // Active Users - every 3 seconds
  setInterval(() => {
    const data = generateData.activeUsers()
    broadcastToSubscribers(WS_MESSAGE_TYPES.ACTIVE_USERS, data)
  }, 3000)

  // User Activity - every 4 seconds
  setInterval(() => {
    const data = generateData.userActivity()
    broadcastToSubscribers(WS_MESSAGE_TYPES.USER_ACTIVITY, data)
  }, 4000)

  // Users by Country - every 5 seconds
  setInterval(() => {
    const data = generateData.usersByCountry()
    broadcastToSubscribers(WS_MESSAGE_TYPES.USERS_BY_COUNTRY, data)
  }, 5000)

  // Realtime Events - every 8 seconds
  setInterval(() => {
    const data = generateData.realtimeEvents()
    broadcastToSubscribers(WS_MESSAGE_TYPES.REALTIME_EVENTS, data)
  }, 8000)

  // System Alerts - every 15 seconds with 30% probability
  setInterval(() => {
    if (Math.random() > 0.7) {
      const data = generateData.systemAlerts()
      broadcastToSubscribers(WS_MESSAGE_TYPES.SYSTEM_ALERTS, data)
    }
  }, 15000)

  // Performance Metrics - every 5 seconds
  setInterval(() => {
    const data = generateData.performanceMetrics()
    broadcastToSubscribers(WS_MESSAGE_TYPES.PERFORMANCE_METRICS, data)
  }, 5000)
}

// Broadcast data to all clients subscribed to a specific type
const broadcastToSubscribers = (type, data) => {
  const message = JSON.stringify({ type, data })

  clients.forEach((client) => {
    if (client.ws.readyState === OPEN && client.subscriptions.includes(type)) {
      client.ws.send(message)
    }
  })
}

// REST API endpoints
app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    clients: clients.size,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

app.get("/api/clients", (req, res) => {
  const clientList = Array.from(clients.values()).map((client) => ({
    id: client.id,
    subscriptions: client.subscriptions,
    connected: client.ws.readyState === OPEN,
  }))

  res.json(clientList)
})

// Start the server
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  setupDataGenerators()
})

export default server
