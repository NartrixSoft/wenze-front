'use client'

import { useState, useRef } from 'react'
import RegisterForm from '@/components/RegisterForm'
import { registerUser } from '@/lib/api/register'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'


export default function RegisterPage() {
  const router=useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    photo: '',
    username: '',
    bio: '',
    adresse: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)

  const handleSubmit = async () => {
    const formDataToSend = new FormData()
    formDataToSend.append('username', formData.username)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('password', formData.password)
    formDataToSend.append('phone', '')
    formDataToSend.append('address', formData.adresse)
    formDataToSend.append('bios', formData.bio)

    if (formData.photo) {
      const blob = dataURLtoBlob(formData.photo)
      if (blob) {
        formDataToSend.append('profile_picture', new File([blob], 'photo.jpg', { type: blob.type }))
      }
    }

    try {
      const user = await registerUser(formDataToSend)
      alert('Inscription réussie !')
      router.push('/api/auth/login/')
      await handleLogin(formData.username, formData.password)
    } catch (err: any) {
      alert('Erreur: ' + JSON.stringify(err))
    }
  }

  const dataURLtoBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1])
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const uintArray = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i)
    }

    const mimeType = dataURL.split(';')[0].split(':')[1]
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(mimeType)) return null

    return new Blob([arrayBuffer], { type: mimeType })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 px-4">
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <RegisterForm
          step={step}
          formData={formData}
          handleInputChange={handleInputChange}
          handlePhotoChange={handlePhotoChange}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          fileInputRef={fileInputRef}
        />
      </motion.div>
    </div>
  )
}