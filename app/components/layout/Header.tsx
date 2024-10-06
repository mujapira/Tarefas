import Logo from "../../assets/logo.svg"
import Image from "next/image"
import { useSession } from "../SessionContext"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  ArrowLeftStartOnRectangleIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline"

export default function Header() {
  const { sessionId } = useSession()
  const { toast } = useToast()

  function copySessionId() {
    if (sessionId) {
      navigator.clipboard.writeText(sessionId)
      toast({ description: "Sessão copiada para a área de transferência" })
    }
  }

  return (
    <header className="bg-[#0D0D0D]">
      {sessionId && (
        <div className="flex items-center justify-between p-2">
          <Button
            variant={"outline"}
            onClick={() => copySessionId()}
            title="Copiar sessão">
            <ClipboardDocumentIcon className="w-5 h-5 mr-2" />
            <span>Copiar ID</span>
          </Button>

          <Button
            variant={"outline"}
            onClick={() => copySessionId()}
            title="Copiar sessão">
            <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-2" />
            <span>Encerrar</span>
          </Button>
        </div>
      )}
      <div className="min-h-52 flex-1 flex-col  w-screen flex items-center justify-center ">
        <Image src={Logo} width={150} alt="Logo" />
      </div>
    </header>
  )
}
