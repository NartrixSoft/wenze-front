// getUser.ts
import axios from '@/lib/axios'
export const getUserData = async () => {
  const res = await axios.get("/api/me/")
  return res.data
}