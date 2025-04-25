import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from "@/lib/axios"
import Image from 'next/image'
import { useMessages } from '@/app/context/MessageContext'

export default function UserEdit({ user }: { user: any }) {
  const [formData, setFormData] = useState({ ...user }) // initialiser formData avec les données de l'utilisateur
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const {setSuccess,setError}=useMessages()
  // Assure-toi que la photo est correctement récupérée et affichée
  useEffect(() => {
    if (user?.profile_picture) {
      setFormData(prevState => ({
        ...prevState,
        photo: user.profile_picture // Si l'utilisateur a une photo, la mettre dans l'état
      }))
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string }) // Prévisualisation de l'image
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {

    const formDataToSend = new FormData() // Utilisation d'un autre nom pour l'objet FormData
    // Ajoute les champs texte au FormData
    for (const field of ['first_name', 'last_name', 'email', 'phone', 'address', 'bios']) {
        formDataToSend.append(field, formData[field] || '') // On utilise formData (état) ici
    }

    // Si l'utilisateur a ajouté une image de profil, on l'ajoute aussi
    const profilePicture = fileInputRef.current?.files?.[0]
    if (profilePicture) {
        formDataToSend.append('profile_picture', profilePicture)
    }

    try {
        const response = await axios.patch(
            'http://127.0.0.1:8000/api/me/',
            formDataToSend,
            {
                headers: {
                    'Content-Type': 'multipart/form-data' // Type spécifique pour l'envoi de fichiers
                }
            }
        )
        console.log('Utilisateur mis à jour:', response.data)
        setSuccess("Profile Mis à jour !")
    } catch (err: any) {
        console.error('Erreur lors de la mise à jour', err.response?.data || err.message)
        alert('Erreur lors de la mise à jour')
    }
  }

  return (
    <div className="space-y-4 mt-8">
      {/* Sélection et prévisualisation de la photo */}
      <div>
        <label className="flex items-center gap-2">
          <span className="text-orange-500">Photo</span>
        </label>
        <div
          className="w-32 h-32 rounded-full bg-white border border-orange-400 mx-auto mb-4 cursor-pointer overflow-hidden flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
          onClick={() => fileInputRef.current?.click()}
        >
          {formData.photo ? (
            <Image
              src={formData.photo} // La photo est déjà dans formData
              alt="Preview"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-orange-400 text-sm">Choisir une photo</span>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </div>

      {/* Champs du formulaire */}
      {['first_name', 'last_name', 'username', 'email', 'phone', 'address', 'bios'].map(field => (
        <div key={field}>
          <Input
            name={field}
            value={formData[field] || ''}
            onChange={handleChange}
            placeholder={field}
            className="w-full"
          />
        </div>
      ))}

      {/* Changement de mot de passe */}
      <div className="grid grid-cols-2 gap-4">
        <Input type="password" placeholder="Nouveau mot de passe" />
        <Input type="password" placeholder="Confirmer le mot de passe" />
      </div>

      <Button
        onClick={handleSubmit}
        className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 py-3 shadow-md"
      >
        Sauvegarder
      </Button>
    </div>
  )
}