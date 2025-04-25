'use client'

import Link from 'next/link'
import {
  FaUser, FaBox, FaShoppingCart, FaEnvelope,
  FaLightbulb, FaHandsHelping, FaSignOutAlt
} from 'react-icons/fa'
import DeconnexionBtn from './DeconnexionBtn'
import BackButton from './BackButton'

export default function MonCompte() {
  const categories = [
    { title: 'Infos personnelles', icon: <FaUser />, link: '/profile/me' },
    { title: 'Mes produits', icon: <FaBox />, link: '/profile/mesproduits' },
    { title: 'Mon panier', icon: <FaShoppingCart />, link: '/cart' },
    { title: 'Messages', icon: <FaEnvelope />, link: '/messages' },
    { title: 'Suggestion', icon: <FaLightbulb />, link: '/suggestion' },
    { title: 'Aide', icon: <FaHandsHelping />, link: '/aide' },
    { title: 'Nous soutenir', icon: <FaHandsHelping />, link: '/support' },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <BackButton />
      <h1 className="text-3xl font-bold text-orange-700 mb-8 text-center">Mon compte</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {categories.map((cat, index) => (
          <Link key={index} href={cat.link} aria-label={cat.title}>
            <div
              title={cat.title}
              className="flex flex-col items-center bg-orange-50 transition transform duration-300 hover:scale-105 hover:shadow-md hover:bg-orange-100 p-6 rounded-xl cursor-pointer"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full text-2xl mb-3">
                {cat.icon}
              </div>
              <div className="text-orange-800 font-medium text-center">{cat.title}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <div className="bg-red-50 hover:bg-red-100 transition p-4 rounded-xl shadow-sm">
          <DeconnexionBtn />
        </div>
      </div>
    </div>
  )
}