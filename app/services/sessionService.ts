import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5149/api/tarefas",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

export const sessionService = {
  async checkSessionValidity(): Promise<boolean> {
    try {
      const response = await api.get("/checkSessionValidity")
      return response.status === 200
    } catch (error) {
      console.error(error)
      return false
    }
  },

  async createSession(): Promise<number | null> {
    try {
      const response = await api.post<{ sessionId: number }>("/createSession")
      return response.data.sessionId
    } catch (error) {
      console.error(error)
      return null
    }
  },
}
