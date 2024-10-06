import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ITask } from "../../interfaces"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useModal } from "../ModalContext"
import { useTask } from "../TaskContext"

interface Props {
  task: ITask
  isFinished?: boolean
}

export default function Task({ task, isFinished = false }: Props) {
  const { openModal } = useModal()
  const { finishTask } = useTask()

  const handleDelete = () => {
    openModal("deletion", { taskId: task.id })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex flex-1 p-4 justify-between items-center gap-2 w-full cursor-pointer">
        <button
          className={`border-2 rounded-full min-h-4 min-w-4 transition-colors 
                    ${
                      isFinished
                        ? "border-purple-dark bg-purple-dark"
                        : "border-blue bg-transparent"
                    }
                   `}>
          {isFinished && <CheckIcon className="w-3 h-3" />}
        </button>
        <span
          className={`flex text-sm w-full
                ${isFinished ? "line-through text-blue" : "text-gray-300"}`}>
          {task.description}
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => handleDelete()}
          className="flex w-full justify-between">
          Excluir
          <TrashIcon className="w-5 h-5 text-blue-400" />
        </ContextMenuItem>
        <ContextMenuItem onClick={() => finishTask(task.id)}>
          {isFinished ? "Tornar pendente" : "Concluir"}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
