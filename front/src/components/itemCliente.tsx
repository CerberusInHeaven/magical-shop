'use client'
import { ClienteItf } from "@/utils/types/ClienteItf"
import { Dispatch, SetStateAction } from "react"
import { Trash2, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
  cliente: ClienteItf
  clientes: ClienteItf[]
  setClientes: Dispatch<SetStateAction<ClienteItf[]>>
}

export default function ItemCliente({ cliente, clientes, setClientes }: Props) {
  const router = useRouter()

  const removerCliente = async () => {
    if (!confirm(`Tem certeza que deseja remover o cliente ${cliente.nome}?`)) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${cliente.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setClientes(clientes.filter(c => c.id !== cliente.id))
        toast.success("Cliente removido com sucesso!")
      } else {
        toast.error("Erro ao remover cliente")
      }
    } catch (error) {
      toast.error("Erro na requisição")
    }
  }

  return (
    <tr className="bg-white border-b dark:bg-black dark:border-gray-700">
      
      <td className="px-6 py-4">{cliente.nome}</td>
      <td className="px-6 py-4">{cliente.email}</td>
      <td className="px-6 py-4 flex gap-2">
       
        <button
          className="text-red-600 hover:text-red-800"
          onClick={removerCliente}
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  )
}
