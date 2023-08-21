import fastify from 'fastify'
import { photosRoutes } from './http/controllers/photos/routes'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { resolve } from 'node:path'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { petsRoutes } from './http/controllers/pets/routes'
import { ZodError } from 'zod'
import { ResourceNotFoundError } from './use-cases/errors/resource-not-found-error'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false, // se true, o cookie é assinado com o secret do jwt e só pode ser lido pelo servidor
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(fastifyMultipart)

app.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/photos',
})

app.register(usersRoutes)
app.register(photosRoutes, { prefix: '/photos' })
app.register(petsRoutes, { prefix: '/pets' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (error instanceof ResourceNotFoundError) {
    reply.status(404).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like Datadog/NewRelic/Sentry
  }

  reply.status(500).send({ message: 'Internal Server Error' })
})
