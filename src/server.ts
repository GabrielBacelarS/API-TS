import fastify, { FastifyInstance } from 'fastify'
import { userRoutes } from './routes/user.route'
import { contactsRoutes } from './routes/contact.router'
const app: FastifyInstance = fastify({ logger: true })

app.register(contactsRoutes, {
  prefix: '/contacts',
})
app.register(userRoutes, {
  prefix: '/users',
})

app.listen(
  {
    port: 3000,
  },
  () => {
    console.log('server open in http://localhost:3000')
  },
)
