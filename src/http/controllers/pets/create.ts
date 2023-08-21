import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    about: z.string().optional(),
    age: z.enum(['NEWBORN', 'PUPPY', 'ADULT', 'ELDERLY']),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    size: z.enum(['TINY', 'SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE']),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    specie: z.enum(['DOG', 'CAT']),
    requirements: z.array(z.string()).default([]),
    photos: z.array(z.string()).default([]),
  })

  const {
    about,
    age,
    energyLevel,
    size,
    independenceLevel,
    specie,
    requirements,
    photos,
    name,
  } = createBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    age,
    energyLevel,
    independenceLevel,
    name,
    specie,
    photos,
    requirements,
    size,
    orgId: request.user.orgId as string,
    about: about || null,
  })

  return reply.status(201).send()
}
