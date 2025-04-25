// auth.ts
import axios from "@/lib/axios"


export async function logout() {
  await axios.post("/api/logout/") // si tu as une route logout, sinon vide
}
export async function login(username: string, password: string) {
  console.log(document.cookie)
  const res = await axios.post("/api/login/", { username, password })
  return res.data
}

// auth.ts
export async function fetchCurrentUser() {
  const res = await axios.get("/api/me/")
  return res.data
}