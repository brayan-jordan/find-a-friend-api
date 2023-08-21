import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = searchQuerySchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  const { pet } = await getPetUseCase.execute({
    id,
  })

  return reply.status(200).send({ pet })
}
