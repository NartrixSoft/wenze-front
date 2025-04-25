'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useUser } from '@/app/context/UserContext'
import { fetchCart, removeCartItem, updateCartItem } from '@/lib/cart'
import Image from 'next/image'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMessages } from '@/app/context/MessageContext'

type CartItem = {
  id: number
  quantity: number
  price: number
  product: number
  product_image: string
}

export default function Cart() {
  const router = useRouter()
  const { user, loading: userLoading } = useUser() || {}
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const {setError,setSuccess}=useMessages()
  useEffect(() => {
    if (!userLoading && user) {
      const fetchData = async () => {
        try {
          const items = await fetchCart()
          setCartItems(items)
        } catch (err) {
          setError('Impossible de charger le panier, réessaie plus tard.')
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    } else if (!userLoading && !user) {
      setError("Tu dois être connecté pour voir ton panier")
      setLoading(false)
    }
  }, [user, userLoading])

  const removeProduct = async (id: number) => {
    try {
      await removeCartItem(id)
      setCartItems(prev => prev.filter(item => item.id !== id))
      setSuccess("Element Supprimer avec succes")
    } catch (err) {
      setError("Erreur lors de la suppression.")
    }
  }

  const updateQuantity = async (id: number, delta: number) => {
    const item = cartItems.find(i => i.id === id)
    if (!item) return
    const newQty = Math.max(1, item.quantity + delta)
    try {
      await updateCartItem(id, newQty)
      setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i))
    } catch (err) {
      setError("Erreur lors de la mise à jour.")
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (loading) return <div className="p-6">Chargement du panier...</div>

  return (
    <main className="p-4 pb-24 lg:pb-8">
      <Button onClick={() => router.back()} variant="outline" className="mb-4 bg-orange-400">
        <ArrowLeft size={18} className="mr-2" /> Retour
      </Button>

      <section>
        <h2 className="text-lg font-semibold text-orange-700 mb-2">Mon panier</h2>
        {cartItems.length === 0 ? (
  <p>Ton panier est vide</p>
) : (
  <div className="space-y-4">
    {cartItems.map(item => (
      <div key={item.id} className="flex items-center justify-between gap-4 bg-orange-50 rounded p-2">
        <div
          onClick={() => router.push(`/products/${item.product}`)}
          className="flex items-center gap-4 cursor-pointer hover:bg-orange-100 rounded p-1 transition"
        >
          <Image
            src={`http://127.0.0.1:8000${item.product_image}` || "/default/default.png"}
            alt={`Produit ${item.product}`}
            width={100}
            height={100}
            className="rounded-md w-24 h-24 object-cover"
          />
          <div>
            <h3 className="text-sm font-medium text-orange-800">Produit #{item.product}</h3>
            <p className="text-xs text-orange-600">{item.price} $</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => updateQuantity(item.id, -1)} className="bg-orange-200 px-2 rounded">-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, 1)} className="bg-orange-200 px-2 rounded">+</button>
        </div>

        <button onClick={() => removeProduct(item.id)} className="text-red-500 hover:text-red-700">
          <Trash2 size={20} />
        </button>
      </div>
    ))}
  </div>
)}

        <div className="flex justify-between items-center mt-8">
          <p className="text-lg font-bold text-orange-800">Total : {total} $</p>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700" onClick={function Message (){  setError("Fonction non disponible, Veuillez ressayer plus tard !")}}>
            Valider la commande
          </button>
        </div>
      </section>
    </main>
  )
}