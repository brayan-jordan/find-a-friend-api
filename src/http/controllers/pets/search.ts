import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    age: z.enum(['NEWBORN', 'PUPPY', 'ADULT', 'ELDERLY']).optional(),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    size: z
      .enum(['TINY', 'SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE'])
      .optional(),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    specie: z.enum(['DOG', 'CAT']).optional(),
  })

  const { city, state, age, energyLevel, size, independenceLevel, specie } =
    searchQuerySchema.parse(request.query)

  const createUserUseCase = makeSearchPetsUseCase()

  const { pets } = await createUserUseCase.execute({
    city,
    state,
    age,
    energyLevel,
    size,
    independenceLevel,
    specie,
  })

  return reply.status(200).send({ pets })
}
