import { ArtefatoItf } from "./ArtefatoItf"
import { ClienteItf } from "./ClienteItf"

export interface PropostaItf {
  id: number
  clienteId: string
  cliente: ClienteItf
  artefatoId: number
  artefato: ArtefatoItf
  encantamentos: string
  resposta: string | null
  createdAt: string
  updatedAt: string | null
}