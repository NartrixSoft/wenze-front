'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Pencil, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import BackButton from '@/components/BackButton'

type Store = {
  id: number
  name: string
  description: string
  store_image: string | null
  created_at: string
  is_public?: boolean
}

function getImageUrl(imagePath: string): string {
  return `${imagePath}`
}

export default function StoresPage() {
  const [myStores, setMyStores] = useState<Store[]>([])
  const [allStores, setAllStores] = useState<Store[]>([])
  const [showModal, setShowModal] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [myStoresError, setMyStoresError] = useState<string | null>(null)
  const [createError, setCreateError] = useState<string | null>(null)

  const fetchStores = async () => {
    try {
      setMyStoresError(null)
      const [myRes, allRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/mine/', { withCredentials: true }),
        axios.get('http://127.0.0.1:8000/api/stores/'),
      ])
      setMyStores(myRes.data)
      setAllStores(allRes.data)
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          setMyStoresError("Vous devez être connecté pour voir vos boutiques.")
        } else if (error.response.status === 500) {
          setMyStoresError("Erreur serveur. Veuillez réessayer plus tard.")
        } else {
          setMyStoresError("Erreur lors du chargement de vos boutiques.")
        }
      } else {
        setMyStoresError("Impossible de se connecter au serveur.")
      }
    }
  }

  useEffect(() => {
    fetchStores()
  }, [])

  const handleCreateStore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCreateError(null)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    if (image) {
      formData.append('store_image', image)
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/stores/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      setShowModal(false)
      setName('')
      setDescription('')
      setImage(null)
      setPreviewUrl(null)
      fetchStores()
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          setCreateError("Vous devez être connecté pour créer une boutique.")
        } else if (error.response.status === 500) {
          setCreateError("Erreur serveur. Veuillez réessayer plus tard.")
        } else {
          setCreateError("Erreur lors de la création de la boutique.")
        }
      } else {
        setCreateError("Impossible de se connecter au serveur.")
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <BackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-700">Mes boutiques</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">
          <Plus size={18} /> Créer une boutique
        </button>
      </div>

      {myStoresError ? (
        <div className="text-center text-red-500">{myStoresError}</div>
      ) : myStores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {myStores.map((store, i) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <div className="relative w-full h-40">
                <Image
                  src={store.store_image || "/default/default.png"}
                  alt={`Image de ${store.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300" />
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-lg font-bold">{store.name}</h3>
                <p className="text-sm line-clamp-2">{store.description}</p>
                <div className="text-xs text-orange-300 mt-1">
                  {store.is_public ? "Publique" : "Privée"} – {new Date(store.created_at).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">Vous n'avez pas encore de boutique.</div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-orange-600 mb-3">Toutes les boutiques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allStores.length > 0 ? (
            allStores.map((store, i) => (
              <Link key={store.id} href={`/stores/${store.id}`}>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer">
                  <div className="relative w-full h-36 mb-3 rounded-md overflow-hidden">
                    <Image
                      src={store.store_image || "/default/default.png"}
                      alt={`Image de ${store.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-orange-800 font-bold">{store.name}</h3>
                  <p className="text-sm text-gray-600">{store.description}</p>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500">Aucune boutique publique disponible.</div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold text-orange-700 mb-4">Créer une boutique</h2>
            <form onSubmit={handleCreateStore} className="space-y-4">
              <input type="text" placeholder="Nom de la boutique" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" required />
              <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded" required />
              <div className="w-full border-2 border-dashed border-orange-300 rounded-md p-4 text-center cursor-pointer hover:bg-orange-50 transition relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0] || null
                    setImage(file)
                    setPreviewUrl(file ? URL.createObjectURL(file) : null)
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {image ? (
                  <p className="text-sm text-gray-700">{image.name}</p>
                ) : (
                  <p className="text-sm text-orange-500">Clique pour choisir une image</p>
                )}
              </div>

              {previewUrl && (
                <div className="mt-3 relative w-full h-40">
                  <Image
                    src={previewUrl}
                    alt="Aperçu"
                    fill
                    className="object-cover rounded-md border"
                  />
                </div>
              )}

              {createError && <p className="text-red-500 text-sm">{createError}</p>}

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}