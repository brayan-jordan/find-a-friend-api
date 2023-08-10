import { Pet, Prisma } from '@prisma/client'
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
      orgId: data.orgId,
      size: data.size,
    }

    this.items.push(pet)

    return pet
  }
}
