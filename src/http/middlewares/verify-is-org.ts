import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyIsOrg() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user?.orgId) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
