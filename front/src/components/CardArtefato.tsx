import { ArtefatoItf } from "@/utils/types/ArtefatoItf";
import Link from "next/link";

export function CardArtefato({ data }: { data: ArtefatoItf }) {
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm bg-cover bg-center bg-no-repeat"
     style={{
       backgroundImage: 'url(/foguinho.gif)'
     }}
>

            <img className="rounded-t-lg" src={data.foto} alt="Foto" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold text-white">
                    {data.tipo.nome} {data.nome}
                </h5>
                <p className="mb-3 font-extrabold text-white text-stroke">
                    Preço R$: {Number(data.preco).toLocaleString("pt-br", {
                        minimumFractionDigits: 2
                    })}
                </p>
                <p className="mb-3 font-extrabold text-white">
                    poder: {data.poder} - {data.raridade}
                </p>
                <Link href={`/detalhes/${data.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Ver Detalhes
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}