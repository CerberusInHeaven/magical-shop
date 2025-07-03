'use client'
import './page.css'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

interface graficoMarcaItf {
  marca: string
  num: number
}

interface graficoClienteItf {
  cidade: string
  num: number
}

interface geralDadosI {
  clientes: number
  artefato: number
  propostas: number
}


export default function Principal() {
  const [carrosMarca, setCarrosMarca] = useState<graficoMarcaItf[]>([])
  const [clientesCidade, setClientesCidade] = useState<graficoClienteItf[]>([])
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGraficoMarca() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/weaponclasses`)
      const dados = await response.json()
      setCarrosMarca(dados)
    }
    getDadosGraficoMarca()

    async function getDadosGraficoCliente() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/clientesCidade`)
      const dados = await response.json()
      setClientesCidade(dados)
    }
    getDadosGraficoCliente()

  }, [])

  const listaCarrosMarca = carrosMarca.map(item => (
    { x: item.marca, y: item.num }
  ))

  const listaClientesCidade = clientesCidade.map(item => (
    { x: item.cidade, y: item.num }
  ))

  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold text-white">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-gray-500 dark:text-black">
            {dados.clientes}</span>
          <p className="font-bold mt-2 text-center text-white">qtd Barganhadores</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-gray-500 dark:text-black">
            {dados.artefato}</span>
          <p className="font-bold mt-2 text-center text-white">qtd Artefatos</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-gray-500 dark:text-black">
            {dados.propostas}</span>
          <p className="font-bold mt-2 text-center text-white">qtd Propostas</p>
        </div>
      </div>

      <div className="div-graficos">
        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaCarrosMarca}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.grayscale}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#ffffff",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Artefatos", "por Tipo"]}
          />
        </svg>

        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaClientesCidade}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.grayscale}
            style={{
              labels: {
                fontSize: 10,
                fill: "#ffffff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#ffffff",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Barganhadores", "por Cidade"]}
          />
        </svg>

      </div>
    </div>
  )
}