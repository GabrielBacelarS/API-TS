import { prisma } from '../database/prisma-client'
import { User, UserRepository, userCreate } from '../interfaces/user.interface'

class UserRepositoryPrisma implements UserRepository {
  async create(data: userCreate): Promise<User> {
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    })
    return result
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: { email: email },
    })
    return result || null
  }
}

export { UserRepositoryPrisma }
