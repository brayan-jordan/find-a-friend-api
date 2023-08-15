import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetAge, PetLevel, PetSize, PetSpecie } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  about: string | null
  age: PetAge
  size: PetSize
  energyLevel: PetLevel
  independenceLevel: PetLevel
  specie: PetSpecie
  requirements: string[]
  photos: string[]
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    about,
    age,
    energyLevel,
    independenceLevel,
    name,
    orgId,
    photos,
    requirements,
    specie,
    size,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      about,
      age,
      energyLevel,
      independenceLevel,
      name,
      specie,
      orgId,
      photos: {
        create: photos.map((photo) => ({ url: photo })),
      },
      requirement: {
        create: requirements.map((requirement) => ({
          description: requirement,
        })),
      },
      size,
    })

    return { pet }
  }
}
