'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FaArrowLeft } from 'react-icons/fa'


export default function InfosPersonnelles() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token')
      if (!token) return

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/me/', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(response.data)
      } catch (err) {
        console.error('Erreur de récupération utilisateur', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) return <div className="text-center mt-10 text-orange-600 animate-pulse">Chargement...</div>
  if (!user) return <p className="text-center mt-10 text-red-500">Aucun utilisateur connecté</p>

  return (
    <motion.div 
      className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* En-tête */}
      <div className="bg-orange-600 p-4 rounded-t-xl flex items-center justify-between shadow-md">
        <Button onClick={() => router.back()} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-black">
          <FaArrowLeft className="text-xl" />
        </Button>
        <h2 className="text-white font-bold text-lg">
          {editMode ? 'Modifier mes infos' : 'Mes Informations'}
        </h2>
      </div>

      {/* Affichage dynamique */}
      {editMode 
        ? <EditionInfos user={user} onCancel={() => setEditMode(false)} /> 
        : <LectureInfos user={user} />
      }

      {/* Bouton */}
      <div className="mt-10 flex justify-center">
        {!editMode && (
          <Button 
            onClick={() => setEditMode(true)} 
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 py-3 shadow-md"
          >
            Modifier mes infos
          </Button>
        )}
      </div>
    </motion.div>
  )
}