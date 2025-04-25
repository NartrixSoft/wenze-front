"use client"
import { useEffect, useState } from "react"
import { useUser } from "@/app/context/UserContext"
import axios from "@/lib/axios"
import ContactList from "./ContactList"
import ChatWindow from "./ChatWindow"

type Contact = {
  id: number
  username: string
  hasNewMessage?: boolean
}

export default function ChatApp() {
  const { user } = useUser()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const fetchContacts = async () => {
    try {
      const res = await axios.get("/api/message/recent/")
      const contactsMap = new Map<number, Contact>()

      res.data.forEach((msg: any) => {
        const contact = msg.sender.id === user.id ? msg.receiver : msg.sender
        const isFromContact = msg.sender.id !== user.id

        // Si ce contact existe déjà et qu’un nouveau message vient d’être reçu
        if (contactsMap.has(contact.id)) {
          if (isFromContact) {
            const c = contactsMap.get(contact.id)!
            c.hasNewMessage = true
            contactsMap.set(contact.id, c)
          }
        } else {
          contactsMap.set(contact.id, {
            ...contact,
            hasNewMessage: isFromContact,
          })
        }
      })

      setContacts(Array.from(contactsMap.values()))
    } catch (err) {
      console.error("Erreur chargement contacts :", err)
    }
  }

  useEffect(() => {
    if (!user?.id) return

    fetchContacts() // premier chargement
    const interval = setInterval(fetchContacts, 5000) // refresh toutes les 5s

    return () => clearInterval(interval) // nettoyage
  }, [user])

  const handleSelect = (contact: Contact) => {
    // Quand on clique, on désactive le badge "nouveau"
    setContacts((prev) =>
      prev.map((c) =>
        c.id === contact.id ? { ...c, hasNewMessage: false } : c
      )
    )
    setSelectedContact(contact)
  }

  return (
    <div className="flex flex-col lg:flex-row h-[80vh] border border-gray-200 rounded-xl shadow-lg overflow-hidden bg-white">
      <ContactList
        contacts={contacts}
        selectedContact={selectedContact}
        onSelect={handleSelect}
      />
      {selectedContact && user?.id && (
        <ChatWindow userId={user.id} contact={selectedContact} />
      )}
    </div>
  )
}