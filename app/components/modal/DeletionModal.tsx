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
import { DeletionModalPayload } from "../ModalContext"

type DeletionModalProps = {
  closeModal: () => void
  payload: DeletionModalPayload
}

export default function DeletionModal({
  closeModal,
  payload,
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
          <AlertDialogAction onClick={() => handleDeleteTask(payload.taskId)}>
            Excluir tarefa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
