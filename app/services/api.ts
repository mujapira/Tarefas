import axios from "axios"

export type ApiResponse<T> = {
  data: T
  status: number
}

const api = axios.create({
  baseURL: "http://localhost:5000/api/tarefas",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  },
})

export default api


