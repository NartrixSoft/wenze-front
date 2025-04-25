"use client"
import { useRef, useState, useEffect } from "react"
import axios from "@/lib/axios"

type Message = {
  id: number
  sender: { id: number; username: string }
  receiver: { id: number; username: string }
  content: string
  created_at: string
}

type Contact = {
  id: number
  username: string
  hasNewMessage: boolean
}

type Props = {
  userId: number
  contact: Contact
}

function groupMessagesByDate(messages: Message[]) {
  const groups: { [date: string]: Message[] } = {}

  messages.forEach((msg) => {
    const date = new Date(msg.created_at).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    if (!groups[date]) groups[date] = []
    groups[date].push(msg)
  })

  return groups
}

export default function ChatWindow({ userId, contact }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    axios.get(`/api/message/conversation/${contact.id}/`)
      .then((res) => {
        if (Array.isArray(res.data)) setMessages(res.data)
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
      })
      .catch((err) => console.error("Erreur lors du chargement des messages :", err))
  }, [contact])

  const handleSend = async () => {
    if (!newMessage.trim()) return
    try {
      const res = await axios.post("/api/message/send/", {
        receiver_id: contact.id,
        content: newMessage
      })
      setMessages((prev) => [...prev, res.data])
      setNewMessage("")
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
    } catch (err) {
      console.error("Erreur lors de l'envoi du message :", err)
    }
  }

  const groupedMessages = groupMessagesByDate(messages)

  return (
    <div className="flex flex-col w-full lg:w-2/3 max-w-3xl mx-auto p-4 bg-orange-50 border border-orange-200 rounded-xl shadow-md">
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 px-2">
        {Object.entries(groupedMessages).map(([date, msgs], i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="text-center text-xs text-gray-500 my-4">{date}</div>

            {msgs.map((msg, j) => {
              const isMine = msg.sender.id === userId
              const time = new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })
              return (
                <div
                  key={j}
                  className={`max-w-[75%] px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                    isMine
                      ? "bg-orange-400 text-white self-end"
                      : "bg-white text-gray-800 border border-orange-200 self-start"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className="text-xs mt-1 text-right text-orange-100/90">{time}</p>
                </div>
              )
            })}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-2 items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2 rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
          placeholder="Écris ton message..."
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
        >
          Envoyer
        </button>
      </div>
    </div>
  )
}