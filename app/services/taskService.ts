import { ITask, ITaskFormData } from "../interfaces"
import api from "./api"
import { handleApiError } from "./apiErrorHandler" // Certifique-se de que a função handleApiError está importada
import axios from "axios"

export const taskService = {
  async fetchTasks(sessionId: string): Promise<ITask[]> {
    try {
      const response = await api.get(`/${sessionId}`)
      const responseData: ITask[] = response.data

      return responseData
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleApiError(error)
      } else {
        console.error("An unknown error occurred:", error)
      }
    }

    return []
  },

  async createTask(formData: ITaskFormData): Promise<ITask> {
    try {
      const task = await api.post("", formData, {})
      return task.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleApiError(error)
      } else {
        console.error("An unknown error occurred:", error)
      }
      return {} as ITask
    }
  },

  async updateTask(taskId: string, updatedTask: ITask): Promise<void> {
    try {
      await api.put(`/${taskId}`, updatedTask)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleApiError(error)
      } else {
        console.error("An unknown error occurred:", error)
      }
    }
  },

  async deleteTask(taskId: string): Promise<void> {
    try {
      await api.delete(`/${taskId}`)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleApiError(error)
      } else {
        console.error("An unknown error occurred:", error)
      }
    }
  },
}
