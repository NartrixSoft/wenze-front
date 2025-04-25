'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from '@/lib/axios'
import { FaArrowLeft, FaSave, FaCircleNotch } from 'react-icons/fa'
import { useMessages } from '@/app/context/MessageContext'

const EditProductPage = () => {
  const router = useRouter()
  const params = useParams()
  const productId = params.id

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [currency, setCurrency] = useState('FC')
  const {setSuccess,setError}=useMessages();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}/`)
        setName(res.data.name)
        setDescription(res.data.description)
        setPrice(res.data.price)
      } catch (err: any) {
        setError("Impossible de charger le produit")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await axios.patch(`/api/products/${productId}/`, { name, description,price })
      setSuccess("Produit ajouté avec succes")
      router.push('/profile/mesproduits')
    } catch (error: any) {
        console.error("Erreur :", error.response?.data)
        setError('Erreur lors de la mise à jour du produit')
      } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex justify-center items-center text-xl text-orange-600"><FaCircleNotch className="animate-spin mr-2" /> Chargement...</div>

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-orange-600 hover:text-orange-800 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Retour
      </button>

      <h1 className="text-3xl font-bold text-orange-700 mb-8">Modifier le produit</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block font-semibold mb-2">Nom du produit</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            rows={4}
            required
          />
        </div>

        <div>
  <label className="block font-semibold mb-2">Prix</label>
  <div className="flex">
    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="w-full px-4 py-2 border rounded-l-lg"
      required
    />
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="px-4 py-2 border rounded-r-lg bg-gray-100"
    >
      <option value="FC">FC</option>
      <option value="$">$</option>
    </select>
  </div>
</div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
        >
          {saving ? (
            <FaCircleNotch className="animate-spin mr-2" />
          ) : (
            <FaSave className="mr-2" />
          )}
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </form>
    </div>
  )
}

export default EditProductPage;