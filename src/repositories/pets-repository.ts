import { PetWithOrg } from '@/@types/entities-with-relations'
import {
  Pet,
  PetAge,
  PetLevel,
  PetSize,
  PetSpecie,
  Prisma,
} from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  search(
    city: string,
    state: string,
    age?: PetAge,
    energyLevel?: PetLevel,
    size?: PetSize,
    independenceLevel?: PetLevel,
    specie?: PetSpecie,
  ): Promise<Pet[]>
  findById(id: string): Promise<PetWithOrg | null>
}
