export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface userCreate {
  email: string
  name: string
}

export interface UserRepository {
  create(data: userCreate): Promise<User>
  findByEmail(email: string): Promise<User | null>
  updateContact?(data:User): Promise<User>
}
