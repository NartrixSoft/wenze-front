// lib/services/store.ts
import axios from "@/lib/axios"

export async function getStoreById(id: string) {
  const res = await axios.get(`api/stores/${id}/`)
  return res.data
}

export async function getStoreProducts(id: string) {
  const res = await axios.get(`api/stores/${id}/products/`)
  return res.data
}