'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* Version Desktop */}
      <footer className="hidden lg:block bg-orange-100 border-t border-orange-200 mt-8 px-8 py-6 text-sm text-orange-800">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-2">WenzeBdd</h3>
            <p className="text-xs text-orange-700">
              La marketplace de Bandundu. Achetez, vendez et découvrez les produits locaux en toute simplicité.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Informations</h4>
            <ul className="space-y-1">
              <li><Link href="/about" className="hover:text-orange-600">À propos</Link></li>
              <li><Link href="/help" className="hover:text-orange-600">Aide</Link></li>
              <li><Link href="/suggestion" className="hover:text-orange-600">Envoyer une suggestion</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1">
              <li><Link href="/support" className="hover:text-orange-600">Nous soutenir</Link></li>
              <li><Link href="/faq" className="hover:text-orange-600">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Réseaux sociaux</h4>
            <ul className="space-y-1">
              <li><Link href="#" className="hover:text-orange-600">Facebook</Link></li>
              <li><Link href="#" className="hover:text-orange-600">WhatsApp</Link></li>
              <li><Link href="#" className="hover:text-orange-600">Instagram</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-orange-600">
          &copy; {currentYear} WenzeBdd. Tous droits réservés.
        </div>
      </footer>

      {/* Version Mobile */}
      <footer className="lg:hidden text-center text-xs text-orange-600 py-4">
        <div className="flex flex-col items-center gap-2">
          <Link href="/about" className="hover:text-orange-500">À propos</Link>
          <Link href="/help" className="hover:text-orange-500">Aide</Link>
          <Link href="/suggestion" className="hover:text-orange-500">Suggestion</Link>
          <Link href="/support" className="hover:text-orange-500">Soutenir</Link>
        </div>
        <p className="mt-2">&copy; {currentYear} WenzeBdd</p>
      </footer>
    </>
  )
}