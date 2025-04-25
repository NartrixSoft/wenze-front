'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input' // Ajout de l'input pour les coordonnées
import axios from '@/lib/axios'
import { useMessages } from '@/app/context/MessageContext'

export default function SuggestionPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [confirmation, setConfirmation] = useState(false)
  const { setSuccess, setError } = useMessages()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      // Envoi de la suggestion avec Axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/suggestions/`,  // L'URL de ton API
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Si tu utilises des cookies pour l'authentification
        }
      )

      // Si la suggestion a été envoyée avec succès
      setFormData({ name: '', email: '', phone: '', message: '' })
      setConfirmation(true)
      setSuccess("Suggestion envoyée avec succès !")

    } catch (error) {
      // Gère l'erreur s'il y a un problème
      console.error(error)
      setError("Erreur lors de l'envoi de ta suggestion")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-4xl font-extrabold text-orange-700 mb-6 text-center">Faire une suggestion</h2>
      <p className="text-sm text-gray-600 mb-8 text-center">
        Tu as une idée, une amélioration ou un bug à signaler ? N'hésite pas à nous en faire part !
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Nom */}
        <div>
          <Label htmlFor="name" className="text-lg font-medium text-gray-700">Nom</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ton nom complet"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-lg font-medium text-gray-700">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ton email"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* Téléphone */}
        <div>
          <Label htmlFor="phone" className="text-lg font-medium text-gray-700">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ton numéro de téléphone"
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="text-lg font-medium text-gray-700">Ta suggestion</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Exprime-toi librement..."
            required
            rows={5}
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* Bouton de soumission */}
        <div>
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 transition-all duration-200 text-white p-3 rounded-lg shadow-lg"
          >
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  )
}