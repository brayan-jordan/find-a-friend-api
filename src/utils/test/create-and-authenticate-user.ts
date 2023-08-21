import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isOrg = false,
) {
  await prisma.user.create({
    data: {
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      isOrg: isOrg
        ? {
            create: {
              city: 'TypeScript City',
              name: 'TypeScript Org',
              state: 'TS',
              address: 'TS Street',
              phone: '123456789',
            },
          }
        : undefined,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
