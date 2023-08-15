import {
  Pet,
  PetAge,
  PetLevel,
  PetSize,
  PetSpecie,
  Prisma,
} from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ? data.id : randomUUID(),
      about: data.about || null,
      age: data.age,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
      name: data.name,
      specie: data.specie,
      size: data.size,
      orgId: data.orgId,
    }

    this.items.push(pet)

    return pet
  }

  async search(
    // Not necessary to mocks in memory
    city: string,
    state: string,
    age?: PetAge,
    energyLevel?: PetLevel,
    size?: PetSize,
    independenceLevel?: PetLevel,
    specie?: PetSpecie,
  ) {
    const pets = this.items.filter((pet) => {
      if (age && pet.age !== age) return false

      if (energyLevel && pet.energyLevel !== energyLevel) return false

      if (size && pet.size !== size) return false

      if (independenceLevel && pet.independenceLevel !== independenceLevel)
        return false

      if (specie && pet.specie !== specie) return false

      return true
    })

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return {
      ...pet,
      org: {
        // Mock in memory
        id: pet.orgId,
        name: 'Typescript Org',
        city: 'Typescript City',
        state: 'TS',
      },
      photos: [],
    }
  }
}
