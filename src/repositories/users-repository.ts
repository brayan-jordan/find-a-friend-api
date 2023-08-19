import { UserWithOrg } from '@/@types/entities-with-relations'
import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<UserWithOrg | null>
}
