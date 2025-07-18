'use client'
import { useEffect, useState } from "react"
import ItemProposta from "@/components/ItemProposta"
import { PropostaItf } from "@/utils/types/PropostaItf"

function ControlePropostas() {
  const [propostas, setPropostas] = useState<PropostaItf[]>([])

  useEffect(() => {
    async function getPropostas() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/propostas`)
      const dados = await response.json()
      setPropostas(dados)
    }
    getPropostas()
  }, [])

  const listaPropostas = propostas.map(proposta => (
    <ItemProposta key={proposta.id} proposta={proposta} propostas={propostas} setPropostas={setPropostas} />
  ))

  return (
    <div className='m-4 mt-24'>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Propostas
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto do Veículo
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Proposta do Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Resposta da Revenda
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaPropostas}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControlePropostas