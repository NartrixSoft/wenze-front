'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { User, ImagePlus, MapPin, FileText, Smile, Mail, Lock } from 'lucide-react'
import { useState } from 'react'

export default function RegisterForm({ formData, step, handleInputChange, handlePhotoChange, handleBack, handleNext, handleSubmit, fileInputRef }: any) {
  // ... contenu identique à ton `Register.tsx`
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const stepVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -20, y: 50 },
    animate: { opacity: 1, scale: 1, rotate: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    exit: { opacity: 0, scale: 0.8, rotate: 20, y: -50, transition: { duration: 0.3 } }
  }

  const steps = [
    <motion.div key="step1" {...stepVariants} className="space-y-4">
      <Label className="flex items-center gap-2"><User className="w-4 h-4 text-orange-500" /> Nom</Label>
      <Input name="last_name" value={formData.nom} onChange={handleInputChange} />
      <Label className="flex items-center gap-2"><User className="w-4 h-4 text-orange-500" /> Prénom</Label>
      <Input name="first_name" value={formData.prenom} onChange={handleInputChange} />
    </motion.div>,
  
    <motion.div key="step2" {...stepVariants} className="space-y-4">
      <Label className="flex items-center gap-2"><ImagePlus className="w-4 h-4 text-orange-500" /> Photo</Label>
      <div className="w-32 h-32 rounded-full bg-white border border-orange-400 mx-auto mb-4 cursor-pointer overflow-hidden flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300" onClick={() => fileInputRef.current?.click()}>
        {formData.photo ? (
          <Image src={formData.photo} alt="Preview" width={128} height={128} className="object-cover w-full h-full" />
        ) : (
          <span className="text-orange-400 text-sm">Choisir une photo</span>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
      <Label className="flex items-center gap-2"><Smile className="w-4 h-4 text-orange-500" /> Nom d'utilisateur</Label>
      <Input name="username" value={formData.username} onChange={handleInputChange} />
    </motion.div>,
  
    <motion.div key="step3" {...stepVariants} className="space-y-4">
      <Label className="flex items-center gap-2"><FileText className="w-4 h-4 text-orange-500" /> Bio</Label>
      <Input name="bio" value={formData.bio} onChange={handleInputChange} />
      <Label className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-500" /> Adresse</Label>
      <Input name="adresse" value={formData.adresse} onChange={handleInputChange} />
    </motion.div>,
  
    <motion.div key="step4" {...stepVariants} className="space-y-4">
      <Label className="flex items-center gap-2"><Mail className="w-4 h-4 text-orange-500" /> Email</Label>
      <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      <Label className="flex items-center gap-2"><Lock className="w-4 h-4 text-orange-500" /> Mot de passe</Label>
      <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
    </motion.div>,
  
    <motion.div key="step5" {...stepVariants} className="space-y-4 text-sm text-gray-700">
      <p><strong>Nom :</strong> {formData.nom}</p>
      <p><strong>Prénom :</strong> {formData.prenom}</p>
      <p><strong>Nom d'utilisateur :</strong> {formData.username}</p>
      <p><strong>Bio :</strong> {formData.bio}</p>
      <p><strong>Adresse :</strong> {formData.adresse}</p>
      <p><strong>Email :</strong> {formData.email}</p>
      <p><strong>Mot de passe :</strong> {formData.password.replace(/./g, '*')}</p>
      {formData.photo && (
        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto shadow-md">
          <Image src={formData.photo} alt="Preview" width={96} height={96} className="object-cover w-full h-full" />
        </div>
      )}
    </motion.div>
  ]
  return (
    <Card className="rounded-2xl shadow-2xl p-6">
      <CardHeader>
        <CardTitle className="text-xl text-center text-orange-600 font-bold animate-pulse">
          {step === 5 ? 'Récapitulatif' : `Étape ${step}/4`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          {steps[step - 1]}
        </AnimatePresence>
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="transition-all hover:scale-105">Retour</Button>
          )}
          {step < steps.length ? (
            <Button onClick={handleNext} className="bg-orange-500 text-white hover:bg-orange-600 transition-all hover:scale-105">Suivant</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-md hover:scale-105 transition-all">
              Valider
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}