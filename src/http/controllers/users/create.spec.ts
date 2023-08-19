import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create', async () => {
    const response = await request(app.server).post('/users').send({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    })

    expect(response.status).toBe(201)
  })
})
