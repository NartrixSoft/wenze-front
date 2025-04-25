"use client"
type Contact = {
  id: number
  username: string
  hasNewMessage?: boolean
}

type Props = {
  contacts: Contact[]
  selectedContact: Contact | null
  onSelect: (contact: Contact) => void
}

export default function ContactList({ contacts, selectedContact, onSelect }: Props) {
  return (
    <div className="w-1/3 border-r p-4 bg-gray-50">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Contacts</h2>
      {contacts.length > 0 ? (
        contacts.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className={`w-full flex items-center justify-between text-left px-4 py-2 mb-2 rounded-md transition-all duration-200 ${
              selectedContact?.id === c.id
                ? "bg-white text-orange-600 font-semibold shadow border border-orange-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{c.username}</span>

            {/* Petit point discret */}
            {c.hasNewMessage && (
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-1"></span>
            )}
          </button>
        ))
      ) : (
        <p className="text-sm text-gray-500">Aucun contact trouvé</p>
      )}
    </div>
  )
}