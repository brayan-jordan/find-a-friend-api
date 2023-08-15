import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetAge, PetLevel, PetSize, PetSpecie } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  state: string
  age?: PetAge
  energyLevel?: PetLevel
  size?: PetSize
  independenceLevel?: PetLevel
  specie?: PetSpecie
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute({
    city,
    state,
    age,
    energyLevel,
    independenceLevel,
    size,
    specie,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.search(
      city,
      state,
      age,
      energyLevel,
      size,
      independenceLevel,
      specie,
    )

    return { pets }
  }
}
