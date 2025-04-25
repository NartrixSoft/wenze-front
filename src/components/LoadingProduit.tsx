import { PackageSearch, ShoppingCart, HandCoins } from 'lucide-react'

export default function LoadingMarketplace() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center text-orange-800">
      <div className="flex space-x-6 mb-6 animate-bounce-slow">
        <PackageSearch size={40} />
        <HandCoins size={40} />
        <ShoppingCart size={40} />
      </div>
      <p className="text-sm text-center">On parcourt les marchés de Bandundu pour toi...</p>
      <p className="text-xs text-orange-600 mt-1">Prépare ton panier, les bons plans arrivent !</p>
    </div>
  )
}