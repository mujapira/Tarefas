import axios from "axios"
import { ITaskFormData } from "../interfaces"

const api = axios.create({
  baseURL: "http://localhost:5149/api/tarefas",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export const taskService = {
  async fetchTasks(sessionId: number): Promise<void> {
    try {
      const response = await api.get(`/${sessionId}`)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  },

  async createTask(formData: ITaskFormData): Promise<void> {
    try {
      await api.post("", formData)
    } catch (error) {
      console.error(error)
    }
  },
}
