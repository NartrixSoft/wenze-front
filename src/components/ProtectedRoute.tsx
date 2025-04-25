//products/[id]
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import axios from '@/lib/axios'
import Link from 'next/link'
import { getMessages } from '@/lib/message'

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}/`)
        setProduct(response.data)
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

  if (loading) {
    return <div className="p-6 text-orange-700">Chargement du produit...</div>
  }

  if (!product) {
    return <div className="p-6 text-red-600">Produit introuvable</div>
  }

  const handleContactSeller = async () => {
    try {
      const response = await axios.get('/api/check-conversation/', {
        params: { receiver_id: product.owner.id },
      });
  
      const conversationId = response.data.conversation_id;
  
      if (conversationId) {
        router.push(`/messages/${product.owner.id}`);
      } else {
        const createResponse = await axios.post('/api/messages/', {
          receiver: product.owner.id,
          content: 'Début de la conversation.',
        });
        router.push(`/messages/${product.owner.id}`);
      }
    } catch (error) {
      console.error("Erreur lors de la gestion de la conversation", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await axios.post('/api/cart-items/', {
        product: product.id,
        quantity: 1,
      })
      alert("Produit ajouté au panier !")
    } catch (error: any) {
      console.error("Erreur lors de l'ajout au panier", error)
      if (error?.response?.status === 401) {
        alert("Vous devez être connecté pour ajouter au panier.")
      } else {
        alert("Une erreur est survenue.")
      }
    }
  }

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/" className="text-sm text-blue-600 hover:underline">← Retour à l'accueil</Link>

      <div className="grid md:grid-cols-2 gap-6 bg-white shadow-md p-4 rounded-xl">
        <Image
          src={product.product_image}
          alt={product.titre}
          width={600}
          height={400}
          className="rounded-lg w-full h-80 object-cover"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-orange-800 mb-2">{product.titre}</h1>
            <p className="text-gray-700 mb-4">{product.description || "Aucune description disponible"}</p>
          </div>

          <div className="text-lg font-semibold text-orange-700 mb-4">
            Prix: {product.price} $
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={handleContactSeller}
              className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
            >
              Contacter le vendeur
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-white text-orange-700 border border-orange-600 py-2 px-4 rounded-lg hover:bg-orange-100 transition"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      {/* Infos du vendeur */}
      <div className="bg-orange-50 p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-orange-700 mb-2">Informations sur le vendeur</h2>
        <div className="flex items-center gap-4">
          <Image
            src={product.owner.profile_image || '/default-user.png'}
            alt={product.owner.username}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-orange-800 font-medium">{product.owner.username}</p>
            <p className="text-sm text-gray-600">Membre depuis {new Date(product.owner.date_joined).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </main>
  )
}