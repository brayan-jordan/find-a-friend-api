import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Find (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'JavaScript Pet',
        age: 'NEWBORN',
        energyLevel: 'LOW',
        size: 'TINY',
        independenceLevel: 'LOW',
        specie: 'DOG',
        photos: ['http://example.com.br'],
        requirements: ['Deve ser uma pessoa cuidadosa com animais'],
      })

    const pet = await prisma.pet.findFirstOrThrow()

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.pet.name).toEqual('JavaScript Pet')
  })
})
