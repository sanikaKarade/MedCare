"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: {
    name: string
    email: string
    phone: string
    password: string
  }) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = "medcare_user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem(STORAGE_KEY)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Demo credentials check
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0].replace(/[._]/g, " "),
        email: email,
        phone: "+1 (555) 123-4567",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }
      setUser(mockUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const register = async (userData: {
    name: string
    email: string
    phone: string
    password: string
  }): Promise<boolean> => {
    // Mock registration - simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
    }
    setUser(mockUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
