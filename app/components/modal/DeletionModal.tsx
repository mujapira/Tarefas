import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useTask } from "../TaskContext"

type DeletionModalProps = {
  closeModal: () => void
  taskId: string
}

export default function DeletionModal({
  closeModal,
  taskId,
}: DeletionModalProps) {
  const { deleteTask } = useTask()

  const handleDeleteTask = async (taskId: string) => {
    deleteTask(taskId)
    closeModal()
  }

  return (
    <AlertDialog onOpenChange={closeModal} open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Após a exclusão, a tarefa não poderá ser recuperada. Tem certeza que
            deseja excluir a tarefa?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeModal}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteTask(taskId)}>
            Excluir tarefa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
