import { FotoItf } from "./FotoItf"
import { PropostaItf } from "./PropostaItf"
import { tipoItf } from "./TipoItf"

export interface ArtefatoItf {
    id: number
    nome: string
    poder: number
    preco: number
    destaque: boolean
    foto: string
    encantamentos: string
    createdAt: Date
    updatedAt: Date
    raridade: string
    tipoId: number
    tipo: tipoItf
    fotos: FotoItf[]
    propostas: PropostaItf[]
}