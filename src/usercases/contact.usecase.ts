import { ContactsRepositoryPrisma } from '../repositories/contacts.repository'
import { Contact, ContactCreate, ContactRepository } from '../interfaces/contacts.interface'
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
      throw new Error('user not found')
    }
    const verifyExistsContacts = await this.ContactRepository.findByEmailOrPhone(email, phone)

    if (verifyExistsContacts) {
      throw new Error('Contacts already exists')
    }

    const contact = await this.ContactRepository.create({
      email: email,
      name: name,
      phone: phone,
      userId: user.id,
    })
    return contact
  }

  async listAllContacts(userEmail: string) {
    const user = await this.UserRepository.findByEmail(userEmail)

    if (!user) {
      throw new Error('user not found')
    }

    const contacts = await this.ContactRepository.findAllContacts(user.id)

    return contacts
  }
  async updateContacts({ id, name, email, phone }: Contact) {
    const data = await this.ContactRepository.updateContact({ id, name, email, phone })
    return data
  }
  async delete(id:string){
    const data = await this.ContactRepository.delete(id)
    return data
  }
}

export { ContactUseCase }
