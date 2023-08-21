import { FastifyInstance } from 'fastify'
import { search } from './search'
import { create } from './create'
import { verifyIsOrg } from '@/http/middlewares/verify-is-org'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { find } from './find'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/', search)
  app.get('/:id', find)

  app.post('/', { onRequest: [verifyIsOrg()] }, create)
}
