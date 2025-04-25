'use client'

import { useEffect, useState } from 'react'
import { getUserData } from '@/lib/getUser'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import UserDisplay from '@/components/UserDisplay'
import UserEdit from '@/components/UserEdit'
import { FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'

export default function InfosPersonnelles() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserData() // pas besoin de token
        setUser(data)
      } catch (error) {
        console.error('Erreur récupération user :', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])


if (loading) return <p className="text-center mt-10 text-orange-600">Chargement...</p>
if (!user) return (
  <div className="text-center mt-10">
    <p className="text-gray-600">Vous n'êtes pas connecté. Veuillez vous connecter pour accéder à cette page.</p>
    <Link href="/api/auth/login" className="text-orange-600 hover:text-orange-800 transition mt-4 inline-block">Se connecter
    </Link>
  </div>
)
  return (
    <motion.div
      className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-orange-600 p-4 rounded-t-xl flex items-center justify-between">
        <Button className="bg-white text-black" onClick={() => history.back()}>
          <FaArrowLeft />
        </Button>
        <h2 className="text-white font-bold">Mes Informations</h2>
        <Button onClick={() => setEditMode(!editMode)} className="bg-white text-orange-600">
          {editMode ? 'Annuler' : 'Modifier'}
        </Button>
      </div>

      {editMode ? <UserEdit user={user} /> : <UserDisplay user={user} />}
    </motion.div>
  )
}