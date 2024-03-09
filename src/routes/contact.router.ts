import { FastifyInstance } from 'fastify'
import { ContactUseCase } from '../usercases/contact.usecase'
import { Contact, ContactCreate } from '../interfaces/contacts.interface'
import { authMiddleware } from '../middlewares/auth.middleware'

export async function contactsRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase()
  fastify.addHook('preHandler', authMiddleware)

  fastify.post<{ Body: ContactCreate }>('/', async (req, reply) => {
    const { name, email, phone } = req.body
    const emailUSer: string | string[] | undefined = req.headers['email']
    try {
      const data = await contactUseCase.create({
        email,
        name,
        phone,
        userEmail: emailUSer,
      })
      return reply.status(201).send(data)
    } catch (error) {
      reply.send(error)
    }
  })

  fastify.get('/', async (req, reply) => {
    const emailUser = req.headers['email']

    // Verifica se emailUser é undefined
    if (emailUser === undefined) {
      reply.status(400).send('Email header is missing') // ou outra resposta apropriada
      return
    }

    try {
      const data = await contactUseCase.listAllContacts(emailUser)
      return data
    } catch (error) {
      reply.send(error)
    }
  })

  fastify.put<{ Body: Contact; Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params
    const { name, email, phone } = req.body
    try {
      const data = await contactUseCase.updateContacts({
        id,
        name,
        email,
        phone,
      })
      return reply.send(data)
    } catch (error) {
      reply.send(error)
    }
  })
  fastify.delete<{ Params: { id: String } }>('/:id', async (req, reply) => {
    const { id } = req.params
    try {
      const data = await contactUseCase.delete(id)
      return reply.send(data)
    } catch (error) {
      reply.send(error)
    }
  })
}
