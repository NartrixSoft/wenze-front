'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

export default function Support() {
  const [openFeedback, setOpenFeedback] = useState(false)
  const [openMobileMoney, setOpenMobileMoney] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'WenzeBdd - Le marché digital de Bandundu',
        text: 'Découvre WenzeBdd, la plateforme en ligne où tu peux vendre et acheter facilement à Bandundu ! Simple, rapide et 100% local. Rejoins la communauté maintenant.',
        url: 'https://wenzebdd.com',
      }).catch((error) => console.error('Erreur lors du partage :', error))
    } else {
      alert("Le partage n'est pas supporté sur ce navigateur.")
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12 text-center space-y-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <h2 className="text-3xl font-semibold text-orange-800 mb-6">Soutenez WenzeBdd</h2>
      <p className="text-lg text-gray-700 mb-6">
        Votre soutien est essentiel pour faire grandir WenzeBdd et l’aider à offrir encore plus de valeur. Que ce soit par vos idées, vos contributions techniques ou un soutien financier, chaque geste compte.
      </p>
      <div className="space-y-6">
        <Button
          onClick={() => setOpenMobileMoney(true)}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white text-lg py-3 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Soutenir via Mobile Money
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 text-lg py-3 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Partager WenzeBdd avec vos amis
        </Button>

        <Button
          onClick={() => setOpenFeedback(true)}
          variant="ghost"
          className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 text-lg py-3 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Faire un retour d'expérience
        </Button>
      </div>

      {/* MODALE - Soutien via réseaux sociaux */}
<Dialog open={openMobileMoney} onOpenChange={setOpenMobileMoney}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-orange-700">Soutenir via un message</DialogTitle>
    </DialogHeader>
    <div className="space-y-4 text-left text-sm text-gray-700">
      <p>Tu peux me contacter directement sur les réseaux ci-dessous pour apporter ton soutien :</p>

      <ul className="list-disc pl-5 space-y-2">
        <li>
          <a
            href="https://wa.me/243903582030?text=Salut%20frère%2C%20je%20viens%20pour%20soutenir%20WenzeBdd%20%21"
            className="text-green-600 hover:underline"
            target="_blank"
          >
            WhatsApp : +243 903 582 030
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=61555908147803"
            className="text-blue-700 hover:underline"
            target="_blank"
          >
            Facebook : Voir profil
          </a>
        </li>
        <li>
          <a
            href="https://t.me/dev_geeks"
            className="text-blue-500 hover:underline"
            target="_blank"
          >
            Telegram : @dev_geeks
          </a>
        </li>
      </ul>

      <p className="text-xs text-gray-500 italic">Tu peux simplement m’écrire avec le message déjà préparé, je saurai que c’est un geste de soutien pour WenzeBdd.</p>
    </div>
  </DialogContent>
</Dialog>

      {/* MODALE - Retour d’expérience */}
      <Dialog open={openFeedback} onOpenChange={setOpenFeedback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-orange-700">Ton retour d’expérience</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea placeholder="Écris ici ce que tu penses de WenzeBdd, tes idées, suggestions ou soucis rencontrés..." />
            <Button className="w-full bg-orange-600 text-white hover:bg-orange-700">Envoyer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}