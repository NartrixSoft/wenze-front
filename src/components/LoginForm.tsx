//LoginForm

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useUser } from "@/app/context/UserContext"
import Link from "next/link"
import { logout } from "@/lib/auth"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useUser() // <<< utilise le contexte
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await login(username, password) // <<< appel via contexte
      router.push("/") // Redirection après login
    } catch (err) {
      console.log(err)
      setError("Nom d'utilisateur ou mot de passe incorrect.")
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label htmlFor="username">Nom d'utilisateur</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full bg-orange-600 text-white">Se connecter</Button>
      <Link href="/api/auth/register" className="text-center text-orange-600">S'enregistrer</Link>
    </form>
  )
}