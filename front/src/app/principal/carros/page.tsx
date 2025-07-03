'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'
import { ArtefatoItf } from "@/utils/types/ArtefatoItf"
import ItemCarro from "@/components/ItemArtefato"



function CadCarros() {
  const [carros, setCarros] = useState<ArtefatoItf[]>([])

  useEffect(() => {
    async function getCarros() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/artefatos`)
      const dados = await response.json()
      setCarros(dados)
    }
    getCarros()
  }, [])

  const listaCarros = carros.map(carro => (
    <ItemCarro key={carro.id} carro={carro} carros={carros} setCarros={setCarros} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Artefatos
        </h1>
        <Link href="carros/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Canalize um artefato
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-[#470e24]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do artefato
              </th>
              <th scope="col" className="px-6 py-3">
                Tipo de arma
              </th>
              <th scope="col" className="px-6 py-3">
                Nivel de poder
              </th>
              <th scope="col" className="px-6 py-3">
                Preço G$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaCarros}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadCarros