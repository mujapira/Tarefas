import Image from "next/image"
import clipboard from "../../assets/clipboard.svg"

export default function EmptyTask() {
  return (
    <div className=" w-full h-auto">
      <div className="py-16 flex flex-col items-center justify-center gap-4">
        <Image
          src={clipboard}
          width={50}
          height={50}
          alt="Picture of the author"
        />
        {/* <img src={clipboard} alt="Clipboard" /> */}
        <div className="flex flex-col items-center justify-center">
          <strong className="font-bold text-gray-300 text-base">
            Você ainda não tem tarefas cadastradas
          </strong>
          <span className="text-gray-300 text-base">
            Crie tarefas e organize seus itens a fazer
          </span>
        </div>
      </div>
    </div>
  )
}
