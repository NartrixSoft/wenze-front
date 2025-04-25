"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { fetchCurrentUser, login} from "@/lib/auth"


type UserContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
}

const UserContext = createContext<UserContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("Fetching current user...")
    fetchCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const handleLogin = async (username: string, password: string) => {
    const data = await login(username, password)
    setUser(data.user || data) // adapte selon ta réponse
  }

  return (
    <UserContext.Provider value={{ user, loading, login: handleLogin}}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}