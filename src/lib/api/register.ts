// /lib/api/register.ts
export const registerUser = async (formData: FormData) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        body: formData,
      })
  
      if (!res.ok) {
        const error = await res.json()
        throw error
      }
  
      return await res.json()
    } catch (err) {
      throw err
    }
  }