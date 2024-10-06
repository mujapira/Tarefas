import axios from "axios"
import api, { ApiResponse } from "./api"
import { handleApiError } from "./apiErrorHandler"

enum SessionEndpoints {
  CheckSessionValidity = "/checkSessionValidity",
  CreateSession = "/createSession",
  RetrieveSessionId = "/retrieveSession/",
}

export const sessionService = {
  async checkSessionValidity(): Promise<boolean> {
    try {
      const response: ApiResponse<void> = await api.get(
        SessionEndpoints.CheckSessionValidity
      )
      return response.status === 200
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleApiError(error)
      } else {
        console.error("An unknown error occurred:", error)
      }
      return false 
    }
  },

  async createSession(): Promise<string | null> {
    try {
      const response: ApiResponse<{ sessionId: string }> = await api.post(
        SessionEndpoints.CreateSession
      )
      return response.data.sessionId
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleApiError(error)
      } else {
        console.error("An unknown error occurred:", error)
      }
      return null
    }
  },

  async retrieveSession(sessionId: string): Promise<string | null> {
    try {
      const response: ApiResponse<{ sessionId: string }> = await api.get(
        SessionEndpoints.RetrieveSessionId + sessionId
      )
      return response.data.sessionId
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleApiError(error)
      } else {
        console.error("An unknown error occurred:", error)
      }
      return null
    }
  },
}
