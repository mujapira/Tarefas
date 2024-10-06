/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  InvalidEvent,
  useEffect,
} from "react"

import EmptyTask from "./components/task/EmptyTask"
import Header from "./components/layout/Header"
import Task from "./components/task/Task"
import { useSession } from "./components/SessionContext"
import { useToast } from "@/hooks/use-toast"
import { useTask } from "./components/TaskContext"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { useModal } from "./components/ModalContext"

export default function Home() {
  const { sessionId } = useSession()
  const { toast } = useToast()
  const {
    tasks,
    completedTasks,
    isTaskListLoading,
    newTaskText,
    setNewTaskText,
    createTask,
  } = useTask()
  const { openModal } = useModal()

  useEffect(() => {
    if (!sessionId) openModal("session")
  }, [sessionId])

  const handleCreateNewTask = async (e: FormEvent) => {
    e.preventDefault()
    if (newTaskText.trim() === "") return

    await createTask(newTaskText)
    toast({
      title: "Tarefa criada!",
      description: "Sua nova tarefa foi adicionada.",
    })
  }

  function handleNewTaskChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity("")
    setNewTaskText(e.target.value)
  }

  function handleInvalidTask(e: InvalidEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity("Esse campo não pode estar vazio!")
  }

  const isNewTaskEmpty = newTaskText.length === 0
  return (
    <div className="App flex flex-col min-h-[100vh]">
      <Header />

      <div className="taskContainer flex-1 bg-[#191919] h-full relative flex items-start justify-center pb-6 px-2">
        {sessionId && (
          <Fragment>
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
                  Criar <PlusCircleIcon className="w-5 h-5 text-gray-100" />
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
                  <span className="created text-sm text-[#4EA8DE] font-bold flex justify-between items-center gap-2">
                    Tarefas criadas{" "}
                    <span className="text-center bg-[#333333] text-gray-200 py-1 px-2 rounded-lg text-xs shadow-sm">
                      {tasks.length}
                    </span>
                  </span>
                  {tasks.length >= 1 ? (
                    <span className="finished text-sm text-[#5E60CE] font-bold flex justify-between items-center gap-2">
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
                        <div className="task flex w-full justify-between items-start bg-[#262626] text-gray-100  gap-3 border border-gray-400 rounded-lg">
                          <Task task={task} isFinished={task.isCompleted} />
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}
