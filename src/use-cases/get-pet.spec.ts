import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get pet by id', async () => {
    petsRepository.items = [
      {
        about: 'A happy dog',
        age: 'PUPPY',
        energyLevel: 'HIGH',
        id: 'pet_1',
        independenceLevel: 'LOW',
        name: 'TypeScript Dog',
        orgId: 'org_1',
        size: 'MEDIUM',
        specie: 'DOG',
      },
    ]

    const { pet } = await sut.execute({
      id: 'pet_1',
    })

    expect(pet.id).toEqual('pet_1')
    expect(pet.name).toEqual('TypeScript Dog')
  })

  it('should not be able to get pet by id if it does not exist', async () => {
    await expect(() => sut.execute({ id: 'pet_1' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
