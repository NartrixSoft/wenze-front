'use client'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { FaSignOutAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'

export default function DeconnexionBtn() {
  const router = useRouter()

  const handleLogout = () => {
    logout()
    console.log('Déconnecté')
    router.push('/')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out scale-100 hover:scale-105">
          <FaSignOutAlt /> Se déconnecter
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Déconnexion</AlertDialogTitle>
          <AlertDialogDescription>Tu es sûr de vouloir te déconnecter ?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white rounded-full">
            Oui, déconnecte-moi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}