import { ContactsRepositoryPrisma } from '../repositories/contacts.repository'
import { ContactCreate, ContactRepository } from '../interfaces/contacts.interface'
import { UserRepositoryPrisma } from '../repositories/user.repository'
import { UserRepository } from '../interfaces/user.interface'
import { error } from 'console'
class ContactUseCase {
  private ContactRepository: ContactRepository
  private UserRepository: UserRepository
  constructor() {
    this.ContactRepository = new ContactsRepositoryPrisma()
    this.UserRepository = new UserRepositoryPrisma()
  }

  async create({ email, name, phone, userEmail }: ContactCreate) {
    const user = await this.UserRepository.findByEmail(userEmail)
    if (!user) {  
        throw new Error("user not found")
    }
  }
}

export { ContactUseCase }
