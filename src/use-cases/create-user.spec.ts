import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create a simple user (not org user)', async () => {
    const { user } = await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
    })

    expect(user.email).toBe('any_email')
    expect(user.name).toBe('any_name')
  })

  it('should be able to create a org user', async () => {
    const { user } = await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      org: {
        create: {
          city: 'any_city',
          name: 'any_org_name',
          state: 'any_state',
          address: 'any_address',
          phone: 'any_phone',
        },
      },
    })

    expect(user.email).toBe('any_email')
    expect(user.name).toBe('any_name')
  })

  it('should not be able to create a user with an existing email', async () => {
    await usersRepository.create({
      email: 'any_email',
      name: 'any_name',
      password_hash: 'any_password',
    })

    await expect(() =>
      sut.execute({
        email: 'any_email',
        name: 'any_name',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
