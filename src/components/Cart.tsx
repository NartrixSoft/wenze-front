'use client'

import { useState, useEffect } from 'react'
import axios from "@/lib/axios"
import Image from 'next/image'
import { Trash2 } from 'lucide-react'

type CartItem = {
  id: number
  product: {
    name: string
    price: number
    image: string
  }
  quantity: number
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Vérifier si on est en client-side et récupérer le token
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // On est en client-side, récupérer le token depuis localStorage
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        setToken(storedToken) // Définir le token dans l'état
      }
    }
  }, [])

  // Effectuer la requête quand le token est disponible
  useEffect(() => {
    if (!token) return // Ne pas lancer la requête si pas de token
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cart/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        setCartItems(response.data)
        setLoading(false)
      } catch (err) {
        setError('Erreur lors du chargement du panier.')
        setLoading(false)
      }
    }
    fetchCart()
  }, [token]) // Re-exécuter ce `useEffect` lorsque le token est mis à jour

  // Mettre à jour la quantité d'un produit
  const updateQuantity = async (id: number, delta: number) => {
    try {
      const updatedItem = cartItems.find(item => item.id === id)
      if (updatedItem) {
        updatedItem.quantity = Math.max(1, updatedItem.quantity + delta)
        await axios.patch(`http://127.0.0.1:8000/api/cart/${id}/`, {
          quantity: updatedItem.quantity
        }, {
          headers: {
            'Authorization': `Bearer ${token}`, // Ajouter le token ici aussi
          }
        })
        setCartItems([...cartItems])
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour de la quantité.')
    }
  }

  // Supprimer un produit du panier
  const removeProduct = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Ajouter le token ici aussi
        }
      })
      setCartItems(cartItems.filter(item => item.id !== id))
    } catch (err) {
      setError('Erreur lors de la suppression du produit.')
    }
  }

  // Calculer le total du panier
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (loading) return <div>Chargement...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow mt-4">
      <h1 className="text-2xl font-bold mb-6 text-orange-700">Mon panier</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Ton panier est vide</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex flex-col gap-4 border-b pb-6"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <div>
                      <h2 className="font-semibold text-orange-800">{item.product.name}</h2>
                      <p className="text-sm text-gray-500">{item.product.price} $ / unité</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-orange-200 px-2 rounded hover:bg-orange-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-orange-200 px-2 rounded hover:bg-orange-300"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-orange-700 font-medium">
                    {item.product.price * item.quantity} $
                  </div>

                  <button
                    onClick={() => removeProduct(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <p className="text-lg font-bold text-orange-800">
              Total : {total} $
            </p>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 shadow">
              Valider la commande
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart