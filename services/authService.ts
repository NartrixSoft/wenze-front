// services/authService.ts
import axios from 'axios';

export async function loginUser({ username, password }: { username: string; password: string }) {
  const response = await axios.post("http://127.0.0.1:8000/api/login/", { username, password });
  return response.data;
}