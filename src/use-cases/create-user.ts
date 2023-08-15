import { UsersRepository } from '@/repositories/users-repository'
import { Prisma, User } from '@prisma/client'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { hash } from 'bcryptjs'

interface CreateUserUseRequest {
  name: string
  email: string
  password: string
  org?: Prisma.OrgCreateNestedOneWithoutUserInput
}

interface CreateUserUseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    email,
    password,
    org,
  }: CreateUserUseRequest): Promise<CreateUserUseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      isOrg: !org
        ? undefined
        : {
            ...org,
          },
    })

    return { user }
  }
}
