// components/UserDisplay.tsx
import { FaUserAlt, FaPhoneAlt, FaMapMarkedAlt, FaClipboard, FaEnvelope, FaIdCard } from 'react-icons/fa'

export default function UserDisplay({ user }: { user: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {[
        { icon: <FaIdCard />, label: 'Nom', value: user.last_name },
        { icon: <FaUserAlt />, label: 'Prénom', value: user.first_name },
        { icon: <FaUserAlt />, label: "Nom d'utilisateur", value: user.username },
        { icon: <FaPhoneAlt />, label: 'Téléphone', value: user.phone || 'Non défini' },
        { icon: <FaMapMarkedAlt />, label: 'Adresse', value: user.address || 'Non définie' },
        { icon: <FaClipboard />, label: 'Bio', value: user.bios || 'Aucune bio définie' },
        { icon: <FaEnvelope />, label: 'Email', value: user.email },
      ].map(({ icon, label, value }, i) => (
        <div key={i} className="flex flex-col items-center bg-orange-50 p-6 rounded-lg shadow-md hover:bg-orange-100 transition-all">
          <div className="text-4xl text-orange-600 mb-3">{icon}</div>
          <h3 className="text-orange-800 font-medium">{label}</h3>
          <p className="text-gray-600">{value}</p>
        </div>
      ))}
    </div>
  )
}