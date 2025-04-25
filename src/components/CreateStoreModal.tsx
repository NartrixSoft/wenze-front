// components/CreateStoreModal.tsx
'use client'

import { useState } from 'react'
import axios from 'axios'
import { Dialog } from '@headlessui/react'

export default function CreateStoreModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [storeImage, setStoreImage] = useState<File | null>(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    if (storeImage) formData.append('store_image', storeImage)

    try {
      await axios.post('http://127.0.0.1:8000/api/stores/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      onClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold">Créer un Store</Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
            <input type="text" placeholder="Nom" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded" />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded" />
            <input type="file" onChange={e => setStoreImage(e.target.files?.[0] || null)} />
            <button type="submit" className="bg-orange-500 text-white py-2 rounded">Créer</button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}