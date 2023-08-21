import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
    org: z
      .object({
        city: z.string(),
        name: z.string(),
        state: z.string(),
        address: z.string(),
        phone: z.string(),
      })
      .optional(),
  })

  const { email, name, password, org } = createBodySchema.parse(request.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()

    await createUserUseCase.execute({
      email,
      name,
      password,
      org: org ? { create: org } : undefined,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
