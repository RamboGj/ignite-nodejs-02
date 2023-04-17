import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

export async function checkSessionIdExists(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = req.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
}
