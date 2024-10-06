import { AxiosError } from "axios"

export const handleApiError = (error: AxiosError): void => {
  if (error.response) {
    console.error(`Error: ${error.response.status} - ${error.response.data}`)
  } else if (error.request) {
    console.error("No response from server:", error.request)
  } else {
    console.error("Error setting up request:", error.message)
  }
}
