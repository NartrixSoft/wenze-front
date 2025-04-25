// lib/api.ts ou services/product.ts

import axios from '@/lib/axios'

export const getProducts = async () => {
  return await axios.get('http://127.0.0.1:8000/api/products/', {
    withCredentials: true,
  })
}