'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Product = {
  id: number
  name: string
  product_image: string
  price: number
  description?: string
  currency?: string
  category?: {
    id: number
    name: string
  } | number
}

type SearchContextType = {
  searchResults: Product[]
  setSearchResults: (results: Product[]) => void
}

const SearchContext = createContext<SearchContextType>({
  searchResults: [],
  setSearchResults: () => {},
})

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState<Product[]>([])

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)