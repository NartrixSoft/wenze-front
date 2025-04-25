'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getStoreById, getStoreProducts } from '@/lib/store'
import Image from 'next/image'
import { CalendarDays, Eye, MapPin, Store, Tag, PlusCircle } from 'lucide-react'
import { useUser } from '@/app/context/UserContext'
import BackButton from '@/components/BackButton'

const StoreDetailPage = () => {
  const { id } = useParams()
  const { user } = useUser()
  const [store, setStore] = useState<any>(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [storeData, productData] = await Promise.all([
          getStoreById(id as string),
          getStoreProducts(id as string),
        ])
        setStore(storeData)
        setProducts(productData)
      } catch (err: any) {
        setError("Impossible de charger les données du magasin.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <div className="text-center py-10 text-gray-500">Chargement...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>
  if (!store) return <div className="text-center py-10 text-gray-500">Magasin introuvable.</div>

  const isOwner = user && store.owner === user.id

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <BackButton />
      {/* HEADER */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
          <Image
            src={store.store_image || "/default/default.png"}
            alt={`Image de ${store.name}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-orange-700 flex items-center gap-2">
              <Store size={28} /> {store.name}
            </h1>
            <p className="text-gray-600 mt-2">{store.description}</p>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <CalendarDays size={18} /> Créée le : {new Date(store.created_at).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2">
              <Eye size={18} /> Visibilité : Publique
            </p>
            {store.location && (
              <p className="flex items-center gap-2">
                <MapPin size={18} /> Localisation : {store.location}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* PRODUITS */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-orange-600">Produits disponibles</h2>
          {isOwner && (
            <button
              onClick={() => console.log('Ouvrir modale ou rediriger')}
              className="flex items-center gap-2 text-sm text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-xl transition"
            >
              <PlusCircle size={18} /> Ajouter un produit
            </button>
          )}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <div key={product.id} className="border rounded-xl shadow-sm hover:shadow-md transition p-4 space-y-2 bg-white">
                <h3 className="text-lg font-bold text-orange-700">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-orange-500 font-bold">{product.price} FC</span>
                  </div>
                {product.category && (
                  <p className="text-xs flex items-center gap-1 text-gray-500">
                    <Tag size={14} /> {product.category}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucun produit n’est encore ajouté à cette boutique.</p>
        )}
      </div>
    </div>
  )
}

export default StoreDetailPage