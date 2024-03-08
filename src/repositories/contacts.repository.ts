import { prisma } from '../database/prisma-client'
import { Contact, ContactCreate, ContactRepository } from '../interfaces/contacts.interface'
class ContactsRepositoryPrisma implements ContactRepository {
  create(data: ContactCreate): Promise<Contact> {}
    findByEmailOrPhone(email: String, phone: String):Promise<Contact || null> {
      const result = await prisma.contacts.findFirst({
        where:{
          OR:[{email}, {phone}]
        },
      })
    }
  }

export {ContactsRepositoryPrisma}