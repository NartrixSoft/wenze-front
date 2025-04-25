//hooks/useUser.ts
import { useEffect, useState } from "react"
import { fetchCurrentUser } from "@/lib/auth"

export default function useUser() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  return { user, loading }
}