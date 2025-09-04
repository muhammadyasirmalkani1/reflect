"Client";

import React from "react";

// Data generators for WebSocket server

// Generate CPU usage data
const cpuUsage = () => {
  return {
    timestamp: new Date().toISOString(),
    value: Math.random() * 100,
  }
}

// Generate memory usage data
const memoryUsage = () => {
  return {
    timestamp: new Date().toISOString(),
    value: Math.random() * 100,
  }
}

// Generate active users data
const activeUsers = () => {
  return {
    activeUsers: Math.floor(Math.random() * 500) + 1000,
    pageViews: Math.floor(Math.random() * 1000) + 3000,
    newSessions: Math.floor(Math.random() * 100) + 200,
    bounceRate: Math.max(20, Math.min(60, Math.random() * 40 + 20)),
  }
}

// Generate user activity data
const userActivity = () => {
  const actions = [
    "Viewed homepage",
    "Completed purchase",
    "Started trial",
    "Downloaded resource",
    "Subscribed newsletter",
    "Added to cart",
    "Shared content",
    "Left review",
    "Updated profile",
    "Contacted support",
  ]

  const locations = [
    "New York, US",
    "London, UK",
    "Toronto, CA",
    "Sydney, AU",
    "Berlin, DE",
    "Tokyo, JP",
    "Paris, FR",
    "São Paulo, BR",
  ]

  const users = [
    "Anonymous User",
    "John Doe",
    "Sarah Chen",
    "Mike Johnson",
    "Emma Wilson",
    "David Kim",
    "Lisa Wang",
    "Alex Thompson",
  ]

  return {
    id: Date.now(),
    user: users[Math.floor(Math.random() * users.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    time: new Date().toISOString(),
  }
}

// Generate users by country data
const usersByCountry = () => {
  return [
    { country: "United States", users: Math.floor(Math.random() * 100) + 400, flag: "🇺🇸" },
    {country: "United Kingdom", users: Math.floor(Math.random() * 50) + 300, flag: "🇬🇧" },
    { country: "Canada", users: Math.floor(Math.random() * 40) + 150, flag: "🇨🇦" },
    { country: "Germany", users: Math.floor(Math.random() * 30) + 150, flag: "🇩🇪" },
    { country: "France", users: Math.floor(Math.random() * 30) + 130, flag: "🇫🇷" },
    { country: "Australia", users: Math.floor(Math.random() * 20) + 110, flag: "🇦🇺" },
    { country: "Japan", users: Math.floor(Math.random() * 20) + 90, flag: "🇯🇵" },
    { country: "Brazil", users: Math.floor(Math.random() * 20) + 80, flag: "🇧🇷" },
    { country: "South Africa", users: Math.floor(Math.random() * 20) + 60, flag: "🇿🇦" },
    { country: "Mexico", users: Math.floor(Math.random() * 20) + 50, flag: "🇲🇽" },
    { country: "Italy", users: Math.floor(Math.random() * 20) + 40, flag: "🇮🇹" },
    { country: "Spain", users: Math.floor(Math.random() * 20) + 30, flag: "🇪🇸" },
    { country: "Netherlands", users: Math.floor(Math.random() * 20) + 20, flag: "🇳🇱" },
    { country: "Sweden", users: Math.floor(Math.random() * 20) + 10, flag: "🇸🇪" },
    { country: "Russia", users: Math.floor(Math.random() * 20) + 5, flag: "🇷🇺" },
    { country: "China", users: Math.floor(Math.random() * 20) + 5, flag: "🇨🇳" },
    { country: "South Korea", users: Math.floor(Math.random() * 20) + 5, flag: "🇰🇷" },
    { country: "Turkey", users: Math.floor(Math.random() * 20) + 5, flag: "🇹🇷" },
    { country: "Argentina", users: Math.floor(Math.random() * 20) + 5, flag: "🇦🇷" },
    { country: "Poland", users: Math.floor(Math.random() * 20) + 5, flag: "🇵🇱" },
    { country: "Belgium", users: Math.floor(Math.random() * 20) + 5, flag: "🇧🇪" },
    { country: "Switzerland", users: Math.floor(Math.random() * 20) + 5, flag: "🇨🇭" },
    { country: "Norway", users: Math.floor(Math.random() * 20) + 5, flag: "🇳🇴" },
    { country: "Finland", users: Math.floor(Math.random() * 20) + 5, flag: "🇫🇮" },
    { country: "Denmark", users: Math.floor(Math.random() * 20) + 5, flag: "🇩🇰" },
    { country: "Ireland", users: Math.floor(Math.random() * 20) + 5, flag: "🇮🇪" },
    { country: "Portugal", users: Math.floor(Math.random() * 20) + 5, flag: "🇵🇹" },
    { country: "Greece", users: Math.floor(Math.random() * 20) + 5, flag: "🇬🇷" },
    { country: "Czech Republic", users: Math.floor(Math.random() * 20) + 5, flag: "🇨🇿" },
    { country: "Hungary", users: Math.floor(Math.random() * 20) + 5, flag: "🇭🇺" },
    { country: "Romania", users: Math.floor(Math.random() * 20) + 5, flag: "🇷🇴" },
    { country: "Ukraine", users: Math.floor(Math.random() * 20) + 5, flag: "🇺🇦" },

  ]
}

// Generate realtime events data
const realtimeEvents = () => {
  const eventTypes = [
    {
      type: "conversion",
      titles: ["New Purchase", "Subscription Upgrade", "Premium Plan"],
      descriptions: ["Order completed", "Plan upgraded", "Premium activated"],
      values: ["$299.99", "$49.99", "$99.99"],
    },
    {
      type: "signup",
      titles: ["New User Registration", "Trial Started", "Account Created"],
      descriptions: ["User signed up", "Free trial began", "Account activated"],
      values: [null, null, null],
    },
    {
      type: "goal",
      titles: ["Goal Completed", "Milestone Reached", "Target Achieved"],
      descriptions: ["Monthly target hit", "User milestone", "Revenue goal"],
      values: ["1000 users", "50K visits", "$10K MRR"],
    },
  ]

  const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
  const randomIndex = Math.floor(Math.random() * randomType.titles.length)

  return {
    id: Date.now(),
    type: randomType.type,
    title: randomType.titles[randomIndex],
    description: randomType.descriptions[randomIndex],
    value: randomType.values[randomIndex],
    time: new Date().toISOString(),
  }
}

// Generate system alerts data
const systemAlerts = () => {
  const alertTypes = ["warning", "error", "info"]
  const alertMessages = [
    "High CPU usage detected",
    "Memory usage above threshold",
    "Disk space running low",
    "Network latency increased",
    "Database connection pool near limit",
    "API rate limit approaching",
    "Cache hit ratio decreased",
    "Background job queue growing",
  ]

  return {
    id: Date.now(),
    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
    message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
    timestamp: new Date().toISOString(),
  }
}

// Generate performance metrics data
const performanceMetrics = () => {
  return {
    cpu: Math.random() * 100,
    memory: Math.random() * 100,
    disk: Math.random() * 100,
    network: Math.random() * 100,
    responseTime: Math.random() * 500,
    requestsPerSecond: Math.random() * 100,
    errorRate: Math.random() * 5,
    timestamp: new Date().toISOString(),
  }
}

// Export all data generators
module.exports = {
  generateData: {
    cpuUsage,
    memoryUsage,
    activeUsers,
    userActivity,
    usersByCountry,
    realtimeEvents,
    systemAlerts,
    performanceMetrics,
  },
}
