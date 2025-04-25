'use client'

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { searchProducts } from '../../services/searchService'

interface LiveSearchProps {
  onResults: (results: any[] | null) => void
}

const LiveSearch = ({ onResults }: LiveSearchProps) => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = query.trim()
      if (trimmed.length < 1) {
        onResults(null) // revenir aux produits populaires
        return
      }
      handleSearch(trimmed)
    }, 500)

    return () => clearTimeout(timeout)
  }, [query])

  const handleSearch = async (searchTerm: string) => {
    try {
      setLoading(true)
      const data = await searchProducts(searchTerm)
      onResults(data)
    } catch (err) {
      console.error("Erreur Axios:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center border border-orange-300 rounded-full px-4 py-2 bg-white">
        <Search size={16} className="text-orange-400 mr-2" />
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {query && loading && (
        <p className="absolute mt-1 px-4 text-xs text-orange-400 animate-pulse">
          Recherche en cours...
        </p>
      )}
    </div>
  )
}

export default LiveSearch