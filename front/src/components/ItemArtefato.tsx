'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"


import { jwtDecode } from "jwt-decode"
import { ArtefatoItf } from "@/utils/types/ArtefatoItf"

interface listaCarroProps {
  carro: ArtefatoItf,
  carros: ArtefatoItf[],
  setCarros: Dispatch<SetStateAction<ArtefatoItf[]>>
}

type AdminPayload = {
  adminLogadoId: string;
  adminLogadoNome: string;
  adminLogadoNivel: number;
};

function ItemCarro({ carro, carros, setCarros }: listaCarroProps) {
  const [admin, setAdmin] = useState<AdminPayload | null>(null);

  useEffect(() => {
    const token = Cookies.get("admin_logado_token");
    if (!token) return;

    try {
      const decoded = jwtDecode<AdminPayload>(token);
      setAdmin(decoded);
      console.log("Usuário logado:", decoded);
    } catch  {
      alert("Token inválido");
    }
  }, []);

  async function excluirCarro() {

    if (!admin || admin.adminLogadoNivel != 1) {
      alert("Você não tem permissão para excluir veículos");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/artefatos/${carro.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const carros2 = carros.filter(x => x.id != carro.id)
        setCarros(carros2)
        alert("Carro excluído com sucesso")
      } else {
        alert("Erro... Carro não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/artefatos/destacar/${carro.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    if (response.status == 200) {
      const carros2 = carros.map(x => {
        if (x.id == carro.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setCarros(carros2)
    }
  }

  return (
    <tr key={carro.id} className="odd:bg-white odd:dark:bg-[#2b2b2b] even:bg-gray-50 even:dark:bg-[#470e24] border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={carro.foto} alt="awooogaaa"
          style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 ${carro.destaque ? "font-extrabold" : ""}`}>
        {carro.nome}
      </td>
      <td className={`px-6 py-4 ${carro.destaque ? "font-extrabold" : ""}`}>
        {carro.tipo.nome}
      </td>
      <td className={`px-6 py-4 ${carro.destaque ? "font-extrabold" : ""}`}>
        {carro.poder}
      </td>
      <td className={`px-6 py-4 ${carro.destaque ? "font-extrabold" : ""}`}>
        {Number(carro.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirCarro} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}

export default ItemCarro