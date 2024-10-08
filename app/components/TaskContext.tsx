"use client"

import React, { createContext, useState, useContext, useEffect } from "react"
import { taskService } from "../services/taskService"
import { useSession } from "./SessionContext"
import { ITask, ITaskFormData } from "../interfaces"

type TaskContextType = {
  tasks: ITask[]
  completedTasks: number
  isTaskListLoading: boolean
  newTaskText: string
  setNewTaskText: (text: string) => void
  loadTasks: () => Promise<void>
  createTask: (newTaskText: string) => Promise<void>
  deleteTask: (id: string) => void
  finishTask: (id: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const { sessionId, isSessionValid } = useSession()
  const [tasks, setTasks] = useState<ITask[]>([])
  const [completedTasks, setCompletedTasks] = useState(0)
  const [isTaskListLoading, setIsTaskListLoading] = useState(true)
  const [newTaskText, setNewTaskText] = useState("")

  useEffect(() => {
    if (sessionId && isSessionValid) {
      loadTasks();
    }
  }, [sessionId, isSessionValid,]);

  const loadTasks = async () => {
    setIsTaskListLoading(true)
    if (sessionId) {
      const sessionTasks = await taskService.fetchTasks(sessionId)
      if (sessionTasks) {
        setTasks(sessionTasks)
      }
    }
    setIsTaskListLoading(false)
  }

  const createTask = async (newTaskText: string) => {
    if (!sessionId) return;
  
    const formData: ITaskFormData = {
      title: "",
      description: newTaskText,
      sessionId,
    };
  
    const newTask = await taskService.createTask(formData);
 
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskText("");
  };
  

  const deleteTask = (id: string) => {
    console.log(id)
    const filteredTasks = tasks.filter((task) => task.id !== id)
    taskService.deleteTask(id)
    setTasks(filteredTasks)
  }

  const finishTask = (id: string) => {
    const task = tasks.find((task) => task.id === id)
    if (!task) return

    const updatedTask = { ...task, isCompleted: !task.isCompleted }
    taskService.updateTask(id, updatedTask)

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    )
    setCompletedTasks((prevCount) =>
      updatedTask.isCompleted ? prevCount + 1 : prevCount - 1
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        completedTasks,
        isTaskListLoading,
        newTaskText,
        setNewTaskText,
        loadTasks,
        createTask,
        deleteTask,
        finishTask,
      }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}
