import BackButton from "@/components/BackButton"
import RecentConversations from "@/components/MessageList"

export default function MessagesPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <BackButton />
      <h1 className="text-xl font-bold mb-4">Discussions récentes</h1>
      <RecentConversations />
    </div>
  )
}