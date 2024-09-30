'use client'
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react"
import EmptyTask from "./components/EmptyTask"
import Task from "./components/Task"
import Header from "./components/Header"
import Image from "next/image";
import plusCircle from "./assets/plusCircle.svg";
interface Task {
  id: string
  content: string
  completed: boolean
  publishedAt: number
}

export default function Home() {
  function getLocal() {
    // const storageStateAsJSON = localStorage.getItem("@ignite:tasks-state-1.0.0")
    // if (storageStateAsJSON) {
    //   return JSON.parse(storageStateAsJSON)
    // } else {
    // }
      return []
  }

  const [tasks, setTasks] = useState<Task[]>(getLocal())
  const [newTaskText, setNewTaskText] = useState("")
  const [completedTasks, setCompletedTasks] = useState<number>(0)

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault()

    const id = String(new Date().getTime())
    const newTask: Task = {
      id,
      content: newTaskText,
      completed: false,
      publishedAt: new Date().getTime(),
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

    setTasks(filteredTasks)
  }

  function handleFinishTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id)
    const task = tasks.filter((task) => task.id === id)
    const updatedTask = task[0]

    if (updatedTask.completed === false) {
      updatedTask.completed = true
      setCompletedTasks((prevState) => prevState + 1)
    } else {
      return
    }

    setTasks([...filteredTasks, updatedTask])
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(tasks)
    localStorage.setItem("@ignite:tasks-state-1.0.0", stateJSON)
  }, [tasks])

  const isNewTaskEmpty = newTaskText.length === 0
  return (
    <div className="App flex flex-col min-h-[100vh]">
      <Header />

      <div className="taskContainer flex-1 bg-zinc-900 h-full relative flex items-start justify-center pb-6 px-2">
        <div className="submitTaskContainer absolute top-[-1.6875rem]
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
              className="bg-neutral-800 flex-1 rounded-lg p-4 border border-gray-700 resize-none h-full text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis focus:border-purple-600 focus:text-gray-100 focus:placeholder:text-gray-100"
            />
            <button
              type="submit"
              disabled={isNewTaskEmpty}
              className="h-full w-[5.625rem] bg-blue-700 rounded-lg text-gray-100 flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-600">
              Criar <Image src={plusCircle} width={16} height={16} alt="Add" />
            </button>
          </form>
        </div>

        <div className="taskList mt-16 max-w-[46rem] w-full flex flex-col items-center justify-center gap-6">
          <header className="wrapper flex items-center justify-between w-full">
            <span className="created text-sm text-blue font-bold flex justify-between items-center gap-2">
              Tarefas criadas{" "}
              <span className="text-center bg-gray-400 text-gray-200 py-1 px-2 rounded-lg text-xs shadow-sm">
                {tasks.length}
              </span>
            </span>
            {tasks.length >= 1 ? (
              <span className="finished text-sm text-purple font-bold flex justify-between items-center gap-2">
                Concluídas{" "}
                <span className="text-center bg-gray-400 text-gray-200 py-1 px-2 rounded-lg text-xs shadow-sm">
                  {completedTasks} de {tasks.length}
                </span>
              </span>
            ) : (
              <span className="finished text-sm text-purple font-bold flex justify-between items-center gap-2">
                Concluídas{" "}
                <span className="text-center bg-gray-400 text-gray-200 py-1 px-2 rounded-lg text-xs shadow-sm">
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
                  <div className="task flex justify-between items-start bg-gray-500 text-gray-100 p-4 gap-3 border border-gray-400 rounded-lg">
                    <Task
                      task={task}
                      onFinish={() => handleFinishTask(task.id)}
                      onDelete={() => handleDeleteTask(task.id)}
                      isFinished={task.completed}
                    />
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
