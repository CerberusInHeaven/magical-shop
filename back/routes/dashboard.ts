import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/gerais", async (req, res) => {
  try {
    const clientes = await prisma.cliente.count()
    const artefato = await prisma.artefato.count()
    const propostas = await prisma.proposta.count()
    res.status(200).json({ clientes, artefato, propostas })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/weaponclasses", async (req, res) => {
  try {
    const marcas = await prisma.tipo.findMany({
      select: {
        nome: true,
        _count: {
          select: { artefatos: true }
        }
      }
    })

    const marcas2 = marcas
        .filter(item => item._count.artefatos > 0)
        .map(item => ({
            marca: item.nome,
            num: item._count.artefatos
        }))
    res.status(200).json(marcas2)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/clientesCidade", async (req, res) => {
  try {
    const clientes = await prisma.cliente.groupBy({
      by: ['cidade'],
      _count: {
        cidade: true,
      },
    })

    const clientes2 = clientes.map(cliente => ({
      cidade: cliente.cidade,
      num: cliente._count.cidade
    }))

    res.status(200).json(clientes2)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
