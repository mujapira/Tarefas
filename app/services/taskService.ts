import axios from "axios"
import { ITask, ITaskFormData } from "../interfaces"

const api = axios.create({
  baseURL: "http://localhost:5149/api/tarefas",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export const taskService = {
  async fetchTasks(sessionId: number): Promise<ITask[]> {
    try {
      const response = await api.get(`/${sessionId}`)
      const responseData: ITask[] = response.data

      return responseData
      
    } catch (error) {
      console.error(error)
    }

    return []
  },

  async createTask(formData: ITaskFormData): Promise<void> {
    try {
      await api.post("", formData, {})
    } catch (error) {
      console.error(error)
    }
  },

  async updateTask(taskId: number, updatedTask: ITask): Promise<void> {
    try {
      await api.put(`/${taskId}`, updatedTask);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  },

  async deleteTask(taskId: number): Promise<void> {
    try {
      await api.delete(`/${taskId}`)
    } catch (error) {
      console.error(error)
    }
  },
}
