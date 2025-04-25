import axios from "@/lib/axios"

export async function fetchCart() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/my-cart/`, {
    withCredentials: true,
  })
  return res.data
}

export async function removeCartItem(id: number) {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${id}/`, {
    withCredentials: true,
  })
}

export async function updateCartItem(id: number, quantity: number) {
  await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${id}/`, 
    { quantity },
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}