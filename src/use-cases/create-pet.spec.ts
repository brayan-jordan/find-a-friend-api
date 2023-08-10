import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    orgsRepository.items.push({
      id: 'org_1',
      name: 'Seu cãopanheiro',
    })

    const { pet } = await sut.execute({
      about: 'about',
      age: 'PUPPY',
      energyLevel: 'HIGH',
      independenceLevel: 'LOW',
      name: 'name',
      orgId: 'org_1',
      photos: ['photo_1', 'photo_2'],
      requirements: ['requirement_1', 'requirement_2'],
      size: 'MEDIUM',
    })

    expect(petsRepository.items).toEqual([
      expect.objectContaining({
        id: pet.id,
      }),
    ])
  })

  it('should not be able to create a pet with an invalid org', async () => {
    await expect(() =>
      sut.execute({
        about: 'about',
        age: 'PUPPY',
        energyLevel: 'HIGH',
        independenceLevel: 'LOW',
        name: 'name',
        orgId: 'org_1',
        photos: ['photo_1', 'photo_2'],
        requirements: ['requirement_1', 'requirement_2'],
        size: 'MEDIUM',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
