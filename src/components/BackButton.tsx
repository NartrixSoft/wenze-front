'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-sm text-orange-600 hover:text-orange-800 transition mb-4"
    >
      <ArrowLeft size={18} className="mr-2" />
      Retour
    </button>
  )
}

export default BackButton