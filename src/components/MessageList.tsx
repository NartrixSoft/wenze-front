"use client"

import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { useUser } from "@/app/context/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

type MessageType = {
  id: number
  sender: {
    id: number
    username: string
    profile_picture?: string
  }
  receiver: {
    id: number
    username: string
    profile_picture?: string
  }
  content: string
  created_at: string
}

export default function RecentConversations() {
  const { user } = useUser()
  const [messages, setMessages] = useState<MessageType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      axios.get("/api/message/recent/")
        .then(res => setMessages(res.data))
        .catch(err => console.error("Erreur de messages:", err))
        .finally(() => setLoading(false))
    }
  }, [user])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="w-full h-16 rounded-xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => {
        const contact = msg.sender.id === user.id ? msg.receiver : msg.sender
        return (
          <Link key={msg.id} href={`/messages/${contact.id}`}>
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition">
              <Avatar>
                <AvatarImage src={contact.profile_picture || ""} alt={contact.username} />
                <AvatarFallback>{contact.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{contact.username}</div>
                <div className="text-sm text-muted-foreground truncate max-w-[250px]">
                  {msg.content}
                </div>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}