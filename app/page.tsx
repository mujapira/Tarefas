/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react"
import EmptyTask from "./components/EmptyTask"
import Header from "./components/Header"
import Image from "next/image"
import plusCircle from "./assets/plusCircle.svg"
import { sessionService } from "./services/sessionService"
import { taskService } from "./services/taskService"
import { ITask, ITaskFormData } from "./interfaces"
import Task from "./components/Task"

export default function Home() {
  const [sessionId, setSessionId] = useState<number>()
  const [isTaskListLoading, setIsTaskListLoading] = useState<boolean>(true)

  useEffect(() => {
    const handleUserFirstContactWithPage = async () => {
      const sessionCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.includes("SessionId"))

      if (!sessionCookie) {
        const newSessionId = await sessionService.createSession()
        if (newSessionId) {
          setSessionId(newSessionId)
        }
      }

      if (sessionCookie) {
        const isSessionValid = sessionService.checkSessionValidity()

        if (!isSessionValid) {
          const newSessionId = await sessionService.createSession()
          if (newSessionId) {
            setSessionId(newSessionId)
          }
        }
      }

      const sessionIdFromCookie = Number(sessionCookie?.split("=")[1])

      setSessionId(sessionIdFromCookie)

      if (sessionCookie) {
        const sessionTasks = await taskService.fetchTasks(sessionIdFromCookie)
        if (sessionTasks) {
          setTasks(sessionTasks)
          setIsTaskListLoading(false)
        }
      }
    }

    handleUserFirstContactWithPage()
  }, [])

  const [tasks, setTasks] = useState<ITask[]>([])
  const [newTaskText, setNewTaskText] = useState("")
  const [completedTasks, setCompletedTasks] = useState<number>(0)

  async function handleCreateNewTask(e: FormEvent) {
    e.preventDefault()

    const formData: ITaskFormData = {
      title: "",
      description: newTaskText,
      sessionId: sessionId!,
    }

    await taskService.createTask(formData)

    const newTask: ITask = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      description: newTaskText,
      createdAt: new Date(),
      isCompleted: false,
      sessionId: sessionId!,
    }

    setTasks([...tasks, newTask])
    setNewTaskText("")
  }

  function handleNewTaskChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity("")
    setNewTaskText(e.target.value)
  }

  function handleInvalidTask(e: InvalidEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity("Esse campo não pode estar vazio!")
  }

  function handleDeleteTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id)

    taskService.deleteTask(Number(id))

    setTasks(filteredTasks)
  }

  function handleFinishTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id)
    const task = tasks.filter((task) => task.id === id)
    
    const updatedTask = task[0]
    taskService.updateTask(Number(id), updatedTask)

    if (updatedTask.isCompleted === false) {
      updatedTask.isCompleted = true
      setCompletedTasks((prevState) => prevState + 1)
    } else {
      updatedTask.isCompleted = false
      setCompletedTasks((prevState) => prevState - 1)
    }

    setTasks([...filteredTasks, updatedTask])
  }

  const isNewTaskEmpty = newTaskText.length === 0
  return (
    <div className="App flex flex-col min-h-[100vh]">
      <Header />

      <div className="taskContainer flex-1 bg-[#191919] h-full relative flex items-start justify-center pb-6 px-2">
        <div
          className="submitTaskContainer absolute top-[-1.6875rem]
         left-0 right-0 text-center mx-auto h-14 max-w-[46rem] flex gap-2 px-2">
          <form
            onSubmit={handleCreateNewTask}
            className="flex text-center gap-2 max-w-[46rem] w-full">
            <textarea
              name="task"
              value={newTaskText}
              placeholder="Adicione uma nova tarefa"
              onFocus={(e) => (e.target.placeholder = "Descreva a tarefa")}
              onBlur={(e) =>
                (e.target.placeholder = "Adicione uma nova tarefa")
              }
              onChange={handleNewTaskChange}
              onInvalid={handleInvalidTask}
              required
              className="bg-[#262626] flex-1 rounded-lg p-4 border border-transparent resize-none h-full text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis focus:border-purple-600 focus:text-gray-100 focus:placeholder:text-gray-100"
            />
            <button
              type="submit"
              disabled={isNewTaskEmpty}
              className="h-full w-[5.625rem] bg-[#1E6F9F] rounded-lg text-gray-100 flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-600">
              Criar <Image src={plusCircle} width={16} height={16} alt="Add" />
            </button>
          </form>
        </div>

        {isTaskListLoading && (
          <div className="loadingTasks text-gray-200 text-center mt-16">
            <p>Carregando tarefas...</p>
          </div>
        )}
        {!isTaskListLoading && (
          <div className="taskList mt-16 max-w-[46rem] w-full flex flex-col items-center justify-center gap-6">
            <header className="wrapper flex items-center justify-between w-full">
              <span className="created text-sm text-blue-400 font-bold flex justify-between items-center gap-2">
                Tarefas criadas{" "}
                <span className="text-center bg-[#333333] text-gray-200 py-1 px-2 rounded-lg text-xs shadow-sm">
                  {tasks.length}
                </span>
              </span>
              {tasks.length >= 1 ? (
                <span className="finished text-sm text-indigo-600 font-bold flex justify-between items-center gap-2">
                  Concluídas{" "}
                  <span className="text-center bg-[#333333] text-gray-200 py-1 px-2 rounded-lg text-xs shadow-sm">
                    {completedTasks} de {tasks.length}
                  </span>
                </span>
              ) : (
                <span className="finished text-sm text-indigo-600 font-bold flex justify-between items-center gap-2">
                  Concluídas{" "}
                  <span className="text-center bg-[#333333] text-gray-200 py-1 px-2 rounded-lg text-xs shadow-sm">
                    {tasks.length}
                  </span>
                </span>
              )}
            </header>

            {tasks.length === 0 ? (
              <EmptyTask />
            ) : (
              tasks.map((task) => {
                return (
                  <div
                    key={task.id}
                    className="main border-tl-lg border-tr-lg border-t border-transparent w-full h-auto">
                    <div className="task flex w-full justify-between items-start bg-[#262626] text-gray-100 p-4 gap-3 border border-gray-400 rounded-lg">
                      <Task
                        task={task}
                        onFinish={() => handleFinishTask(task.id)}
                        onDelete={() => handleDeleteTask(task.id)}
                        isFinished={task.isCompleted}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}
