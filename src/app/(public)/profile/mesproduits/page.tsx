'use client'

import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Link from 'next/link'
import { FaArrowLeft, FaPen, FaTrash, FaPlus, FaBoxOpen, FaCircleNotch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


const MyProductsPage = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ordering, setOrdering] = useState<string>('') // pour le tri
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/my-product/', {
          params: { ordering }
        })
        setProducts(response.data)
      } catch (error: any) {
        if ((error.response?.status === 401) || (error.response?.status === 40)) {
          setError('Vous devez être connecté pour voir vos produits')
          router.push('/api/auth/login')
        } else {
          setError('Erreur lors de la récupération des produits')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [ordering])

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/products/${id}`)
      setProducts(products.filter((product) => product.id !== id))
    } catch (error) {
      console.error(error)
      setError('Erreur lors de la suppression du produit')
    }
  }

  if (loading) return <div className="flex justify-center items-center text-xl text-orange-600"><FaCircleNotch className="animate-spin mr-2" /> Chargement...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto p-6">
      <button 
        onClick={() => router.push('/profile')} 
        className="flex items-center text-orange-600 hover:text-orange-800 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Retour à mon compte
      </button>

      <h1 className="text-3xl font-bold text-orange-700 mb-4 flex items-center">
        <FaBoxOpen className="mr-3" />
        Mes Produits
      </h1>

      {/* Menu de tri */}
      <div className="mb-6 flex justify-end">
        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className="border px-4 py-2 rounded-lg text-gray-700"
        >
          <option value="">Trier par défaut</option>
          <option value="price">Prix croissant</option>
          <option value="-price">Prix décroissant</option>
          <option value="created_at">Plus anciens</option>
          <option value="-created_at">Plus récents</option>
          <option value="name">Nom A-Z</option>
          <option value="-name">Nom Z-A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map((product) => (
    <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <div className="h-48 bg-gray-100 overflow-hidden">
      <Image
  src={product.product_image || '/images/default.png'}
  alt={product.name}
  width={500}
  height={300}
  className="w-full h-full object-cover"
  style={{ width: '100%', height: '100%' }}
/>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-orange-700">{product.name}</h2>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <Link href={`/products/${product.id}/edit`}>
            <FaPen className="text-blue-600 hover:text-blue-800 cursor-pointer" title="Modifier" />
          </Link>
          <FaTrash 
            className="text-red-600 hover:text-red-800 cursor-pointer" 
            onClick={() => handleDelete(product.id)} 
            title="Supprimer" 
          />
        </div>
      </div>
    </div>
  ))}
</div>

      <div className="mt-6 text-center">
        <Link href="/products/add">
          <button className="flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700">
            <FaPlus className="mr-2" />
            Ajouter un produit
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MyProductsPage