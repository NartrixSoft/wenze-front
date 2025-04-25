import axios from "@/lib/axios"

export async function getMessages(receiverId: number) {
  try {
    const res = await axios.get(`/api/messages/`,{
      params:{
        'receiver_id':receiverId
      }
    }) // GET pour récupérer la conversation

    return res.data // axios met déjà la réponse dans `data`
  } catch (error: any) {
    if (error.response?.status === 404) {
      // Si la discussion n'existe pas encore, crée la conversation automatiquement
      await sendMessage(receiverId, "Début de la conversation.") // Créer la discussion
      return [] // Retourne une liste vide pour que l'interface puisse s'initialiser
    }
    console.error("Erreur lors de la récupération des messages", error)
    throw new Error("Erreur lors de la récupération des messages")
  }
}

export async function sendMessage(receiverId: number, content: string) {
  try {
    const res = await axios.post('/api/messages/', {
      receiver: receiverId,
      content,
    })

    return res.data
  } catch (error) {
    console.error("Erreur lors de l’envoi du message", error)
    throw new Error("Erreur lors de l’envoi")
  }
}