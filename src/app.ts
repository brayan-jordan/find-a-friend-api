import fastify from 'fastify'
import { photosRoutes } from './http/controllers/photos/routes'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { resolve } from 'node:path'

export const app = fastify()

app.register(fastifyMultipart)

app.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/photos',
})

app.register(photosRoutes, { prefix: '/photos' })
