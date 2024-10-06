"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { ChangeEvent, Fragment, useState } from "react"
import { useSession } from "../SessionContext"
import { useTask } from "../TaskContext"
import { Input } from "@/components/ui/input"

type SessionModalProps = {
  closeModal: () => void
}

export default function SessionModal({ closeModal }: SessionModalProps) {
  const { retrieveSession, sessionId, createSession } = useSession()
  const [currentStep, setCurrentStep] = useState(1)
  const { loadTasks } = useTask()
  const [sessionIdToRetrieve, setSessionIdToRetrieve] = useState<string>("")

  async function handleRetrieveSession() {
    const retrieved = await retrieveSession(sessionIdToRetrieve)

    if (retrieved) {
      toast({
        title: "Sessão recuperada com sucesso!",
        description: "Você já pode começar a adicionar tarefas.",
      })

      loadTasks()
      closeModal()
    }
  }

  const handleCreateSession = async () => {
    const created = await createSession()
    if (created) {
      toast({
        title: "Sessão criada com sucesso!",
        description: "Você já pode começar a adicionar tarefas.",
      })
    }
    closeModal()
  }

  function handleRetrieveSessionIdInputChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    e.preventDefault()
    e.stopPropagation()
    setSessionIdToRetrieve(e.target.value)
  }

  return (
    <Dialog onOpenChange={closeModal} open={true}>
      <DialogContent>
        {currentStep === 1 && (
          <Fragment>
            <DialogHeader>
              <DialogTitle>Olá, bem vindo</DialogTitle>
              <DialogDescription>
                Não foi possível encontrar uma sessão ativa. Gostaria de criar
                uma nova sessão ou recuperar uma existente?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex !flex-col items-start">
              <div className="flex items-center justify-end w-full gap-4">
                <Button onClick={() => setCurrentStep(2)}>
                  Recuperar sessão
                </Button>
                <Button className="!ml-0" onClick={handleCreateSession}>
                  Criar nova sessão
                </Button>
              </div>
            </DialogFooter>
          </Fragment>
        )}
        {currentStep === 2 && (
          <Fragment>
            <DialogHeader>
              <DialogTitle>Recuperar sessão</DialogTitle>
              <DialogDescription>
                Insira o ID da sessão que deseja recuperar.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex !flex-col items-start gap-4">
              <Input
                className="text-zinc-700"
                value={sessionIdToRetrieve}
                onChange={handleRetrieveSessionIdInputChange}
              />
              <div className="flex items-center justify-end w-full gap-4">
                <Button className="!ml-0" onClick={() => setCurrentStep(1)}>
                  Voltar
                </Button>
                <Button onClick={handleRetrieveSession}>Recuperar</Button>
              </div>
            </DialogFooter>
          </Fragment>
        )}
      </DialogContent>
    </Dialog>
  )
}
