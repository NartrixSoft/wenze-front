// 404.tsx
'use client'

import { FC } from "react"
import Link from "next/link"
import { Home } from "lucide-react"

const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-100 text-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Désolé, cette page n'existe pas.</p>
        <Link href="/" className="flex items-center justify-center gap-2 text-orange-600 hover:text-orange-700 bg-orange-100 px-6 py-2 rounded-md transition-all duration-300">
          <Home size={18} /> Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage