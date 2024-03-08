import { FastifyInstance } from 'fastify'
import { UserUseCase } from '../usercases/user.usecase'
import { userCreate } from '../interfaces/user.interface'

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()

  fastify.post<{ Body: userCreate }>('/', async (req, reply) => {
    const { name, email } = req.body

    try {
      const data = await userUseCase.create({
        name,
        email,
      })
      return reply.status(201).send('User created successfully')
    } catch (error) {
      reply.send(error)
    }
  })

  fastify.get('/', (req, reply) => {
    return reply.send('Welcome')
  })
}
