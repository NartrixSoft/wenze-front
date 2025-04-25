'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function Aide() {
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Message envoyé:", msg)
    setSent(true)
    setMsg('')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl mt-10 space-y-8 animate-in fade-in slide-in-from-bottom-10">
      <h2 className="text-2xl font-bold text-orange-700 text-center">Besoin d'aide ?</h2>

      <Accordion type="single" collapsible>
        <AccordionItem value="q1">
          <AccordionTrigger>Comment vendre un produit ?</AccordionTrigger>
          <AccordionContent>
            Clique sur "Vendre un produit" dans la page d’accueil, remplis les infos et c’est parti !
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>Comment contacter un vendeur ?</AccordionTrigger>
          <AccordionContent>
            Utilise la messagerie intégrée pour envoyer un message directement au vendeur.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Contacte-nous directement</Label>
          <Textarea value={msg} onChange={(e) => setMsg(e.target.value)} required placeholder="Pose ta question..." />
        </div>
        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">Envoyer</Button>
        {sent && <p className="text-green-600 text-sm text-center">Merci, on te répondra vite !</p>}
      </form>
    </div>
  )
}