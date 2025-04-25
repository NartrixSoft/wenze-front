'use client'

import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-5xl font-bold text-yellow-600 mb-4">403 - Accès refusé</h1>
      <p className="text-lg text-gray-700 mb-6">
        Vous n’avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <Link href="/" className="text-yellow-600 underline hover:text-yellow-800">
        Retour à l'accueil
      </Link>
    </div>
  )
}