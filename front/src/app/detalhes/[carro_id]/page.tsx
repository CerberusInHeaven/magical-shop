"use client"
import { ArtefatoItf } from "@/utils/types/ArtefatoItf"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useClienteStore } from "@/context/ClienteContext"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const params = useParams()

  const [artefatos, setArtefatos] = useState<ArtefatoItf>()
  const { cliente } = useClienteStore()

  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/artefatos/${params.carro_id}`)
      const dados = await response.json()
      // console.log(dados)
      setArtefatos(dados)
    }
    buscaDados()
  }, [])

  const listaFotos = artefatos?.fotos.map(foto => (
    <div key={foto.id}>
      <img src={foto.url} alt={foto.encantamentos}
        title={foto.encantamentos}
        className="h-52 max-w-80 rounded-lg" />
    </div>
  ))

  async function enviaProposta(data: Inputs) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/propostas`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        artefatoId: Number(params.carro_id),
        descricao: data.descricao
      })
    })

    if (response.status == 201) {
      toast.success("Obrigado. Sua proposta foi enviada. Aguarde retorno")
      reset()
    } else {
      toast.error("Erro... Não foi possível enviar sua proposta")
    }
  }

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      style={{
       backgroundImage: 'url(/foguinho.gif)'
     }}>

        {artefatos?.foto &&
          <>
            <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
              src={artefatos?.foto} alt="Foto do Carro" />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {artefatos?.tipo.nome} {artefatos?.nome}
              </h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                Poder: {artefatos?.poder} - {artefatos?.raridade}
              </h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                Preço R$: {Number(artefatos?.preco)
                  .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {artefatos?.encantamentos}
              </p>
              {cliente.id ?
                <>
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Você pode fazer uma Proposta para este artefato!</h3>
                  <form onSubmit={handleSubmit(enviaProposta)}>
                    <input type="text" className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${cliente.nome} (${cliente.email})`} disabled readOnly />
                    <textarea id="message" className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Descreva a sua proposta"
                      required
                      {...register("descricao")}></textarea>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar Proposta</button>
                  </form>
                </>
                :
                <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                  APENAS AVENTUREIROS IDENTIFICADOS PODEM BARGANHARRRRRRR
                </h2>
              }
            </div>
          </>
        }
      </section>

      <div className="mt-4 md:max-w-5xl mx-auto
         grid grid-cols-2 md:grid-cols-3 gap-4">
        {listaFotos}
      </div>

    </>
  )
}