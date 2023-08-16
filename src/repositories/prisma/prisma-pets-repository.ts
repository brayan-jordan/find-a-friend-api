import { PetAge, PetLevel, PetSize, PetSpecie, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  search(
    city: string,
    state: string,
    age?: PetAge,
    energyLevel?: PetLevel,
    size?: PetSize,
    independenceLevel?: PetLevel,
    specie?: PetSpecie,
  ) {
    const pets = prisma.pet.findMany({
      where: {
        org: {
          city,
          state,
        },
        age,
        energyLevel,
        size,
        independenceLevel,
        specie,
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        photos: true,
        org: true,
      },
    })

    return pet
  }
}
