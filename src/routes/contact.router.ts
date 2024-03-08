import { FastifyInstance } from 'fastify'
import { ContactUseCase } from '../usercases/contact.usecase'
import { ContactCreate } from '../interfaces/contacts.interface'
import { authMiddleware } from '../middlewares/auth.middleware'

export async function contactsRoutes(fastify: FastifyInstance) {

  const contactUseCase = new ContactUseCase()
  fastify.addHook('preHandler', authMiddleware)

  fastify.post<{ Body: ContactCreate }>('/', async (req, reply) => {
    const { name, email, phone } = req.body
    const emailUSer = req.headers['email']
    try {
      const data = await contactUseCase.create({
        email,
        name,
        phone,
        userEmail: emailUSer,
      })
      return reply.status(201).send('User created successfully')
    } catch (error) {
      reply.send(error)
    }
  })
}
