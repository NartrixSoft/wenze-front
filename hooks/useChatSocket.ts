import { useEffect, useRef } from "react"

export default function useChatSocket(receiverId: number, onMessage: (data: any) => void) {
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (!receiverId) return

    const socketUrl = `ws://localhost:8000/ws/chat/${receiverId}/`
    const socket = new WebSocket(socketUrl)
    socketRef.current = socket

    socket.onopen = () => console.log("WebSocket connecté")
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      onMessage(data)
    }
    socket.onerror = (error) => console.error("WebSocket erreur:", error)
    socket.onclose = () => console.log("WebSocket fermé")

    return () => socket.close()
  }, [receiverId])

  const sendMessage = (message: string) => {
    socketRef.current?.send(JSON.stringify({ message }))
  }

  return { sendMessage }
}