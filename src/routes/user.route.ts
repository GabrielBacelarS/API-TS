import { FastifyInstance } from 'fastify'
import { UserUseCase } from '../usercases/user.usecase'
import { userCreate } from '../interfaces/user.interface'
import { prisma } from '../database/prisma-client'

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()

  fastify.post<{ Body: userCreate }>('/', async (req, reply) => {
    const { name, email } = req.body

    try {
      const data = await userUseCase.create({
        name,
        email,
      })
      return reply.status(201).send(data)
    } catch (error) {
      reply.send(error)
    }
  })

  fastify.get('/', async (req, reply) => {
    const result = await prisma.user.findMany({})
    return reply.status(200).send(result)
  })
}
