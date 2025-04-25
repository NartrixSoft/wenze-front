export const getCurrentUser = async () => {
    const res = await fetch('http://127.0.0.1:8000/me/', {
      credentials: 'include',
    })
  
    if (!res.ok) return null
    return res.json()
  }