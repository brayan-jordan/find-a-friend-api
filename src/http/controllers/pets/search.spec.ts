import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search', async () => {
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
      })

    const response = await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)
      .query({
        city: 'TypeScript City',
        state: 'TS',
        age: 'NEWBORN',
        energyLevel: 'LOW',
        size: 'TINY',
        independenceLevel: 'LOW',
        specie: 'DOG',
      })

    expect(response.status).toBe(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'JavaScript Pet',
      }),
    ])
  })
})
