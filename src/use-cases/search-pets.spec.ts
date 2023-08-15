import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets', async () => {
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
      {
        about: 'A happy cat',
        age: 'PUPPY',
        energyLevel: 'HIGH',
        id: 'pet_2',
        independenceLevel: 'LOW',
        name: 'TypeScript Cat',
        orgId: 'org_1',
        size: 'MEDIUM',
        specie: 'CAT',
      },
    ]

    const { pets } = await sut.execute({
      city: 'city_1',
      state: 'state_1',
      age: 'PUPPY',
      energyLevel: 'HIGH',
      specie: 'DOG',
      independenceLevel: 'LOW',
      size: 'MEDIUM',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        id: 'pet_1',
        name: 'TypeScript Dog',
      }),
    ])
  })
})
