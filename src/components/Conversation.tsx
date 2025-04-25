'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { getMessages, sendMessage } from '@/lib/message'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Message = {
  id: number
  sender_name: string
  content: string
  timestamp: string
}

export default function ConversationPage() {
  const { id } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const conversationId = Number(id)

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await getMessages(conversationId)
        setMessages(data)
      } catch (error) {
        console.error('Erreur lors du chargement des messages', error)
      } finally {
        setLoading(false)
      }
    }

    loadMessages()
  }, [conversationId])

  const handleSend = async () => {
    if (!newMessage.trim()) return
    try {
      const msg = await sendMessage(conversationId, newMessage)
      setMessages(prev => [...prev, msg])
      setNewMessage('')
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch (err) {
      console.error('Erreur lors de l’envoi du message', err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src="/img/profile_pictures/kevin.jpg"
          alt="Nom du vendeur"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="text-xl font-semibold text-orange-700">Kevin Mbayo</h1>
      </div>

      <div className="bg-white border rounded-xl p-4 h-[60vh] overflow-y-auto space-y-3 shadow-inner">
        {loading ? (
          <p className="text-gray-400">Chargement des messages...</p>
        ) : (
          messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`max-w-xs p-3 rounded-lg text-sm ${
                msg.sender_name === 'Moi'
                  ? 'bg-orange-100 text-right self-end ml-auto'
                  : 'bg-gray-100 text-left'
              }`}
            >
              <p>{msg.content}</p>
              <span className="block text-[10px] text-gray-400 mt-1">
                {msg.timestamp}
              </span>
            </motion.div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          type="text"
          placeholder="Écris un message..."
          className="flex-1 border border-orange-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
        <button
          onClick={handleSend}
          className="bg-orange-600 text-white rounded-full px-4 hover:bg-orange-700"
        >
          Envoyer
        </button>
      </div>
    </div>
  )
}