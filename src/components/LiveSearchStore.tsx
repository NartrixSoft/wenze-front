'use client'

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { searchStores } from '../../services/searchService' // à créer si pas encore fait

interface LiveStoreSearchProps {
  onResults: (results: any[] | null) => void
}

const LiveStoreSearch = ({ onResults }: LiveStoreSearchProps) => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = query.trim()
      if (trimmed.length < 1) {
        onResults(null)
        return
      }
      handleSearch(trimmed)
    }, 500)

    return () => clearTimeout(timeout)
  }, [query])

  const handleSearch = async (searchTerm: string) => {
    try {
      setLoading(true)
      const data = await searchStores(searchTerm) // appel vers l'API pour les stores
      onResults(data)
    } catch (err) {
      console.error("Erreur Axios:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center border border-blue-300 rounded-full px-4 py-2 bg-white">
        <Search size={16} className="text-blue-400 mr-2" />
        <input
          type="text"
          placeholder="Rechercher un magasin..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {query && loading && (
        <p className="absolute mt-1 px-4 text-xs text-blue-400 animate-pulse">
          Recherche en cours...
        </p>
      )}
    </div>
  )
}

export default LiveStoreSearch