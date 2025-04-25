import axios from "@/lib/axios" // ton instance axios si tu en as une

export const searchProducts = async (query: string) => {
  const res = await axios.get(`api/search/products/?query=${encodeURIComponent(query)}`)
  return res.data
}

export const searchStores = async (query: string) => {
  const response = await axios.get(`/api/search/stores/?q=${encodeURIComponent(query)}`)
  return response.data
}