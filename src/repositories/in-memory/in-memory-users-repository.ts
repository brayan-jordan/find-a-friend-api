import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      email: data.email,
      id: data.id || 'user_' + this.items.length + 1,
      name: data.name,
      password_hash: data.password_hash,
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return { ...user, isOrg: null }
  }
}
