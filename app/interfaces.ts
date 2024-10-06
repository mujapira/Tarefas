export interface ITask {
  id: string
  title: string
  description: string
  createdAt: Date
  isCompleted: boolean
  sessionId: string
}

export interface ITaskFormData {
  title: string
  description: string
  sessionId: string
}
