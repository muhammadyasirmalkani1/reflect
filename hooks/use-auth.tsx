'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin' | 'moderator'
  permissions: string[]
  plan: 'free' | 'pro' | 'enterprise'
  avatar?: string
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (user: Partial<User>) => Promise<void>
  hasPermission: (permission: string) => boolean
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (err) {
        console.error('Failed to parse stored user:', err)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'user',
        permissions: ['read:notes', 'write:notes', 'read:search'],
        plan: 'free',
        createdAt: new Date().toISOString(),
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      const mockUser: User = {
        id: Math.random().toString(),
        email,
        name,
        role: 'user',
        permissions: ['read:notes', 'write:notes', 'read:search'],
        plan: 'free',
        createdAt: new Date().toISOString(),
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      setUser(null)
      localStorage.removeItem('user')
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) ?? false
  }

  const hasRole = (role: string): boolean => {
    return user?.role === role
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    hasPermission,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
