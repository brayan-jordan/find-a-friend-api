import { makeUploadPhotoUseCase } from '@/use-cases/factories/make-upload-photo'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function upload(request: FastifyRequest, reply: FastifyReply) {
  const upload = await request.file({
    limits: {
      fileSize: 5_242_880, // 5mb
    },
  })

  if (!upload) {
    return reply.status(400).send()
  }

  const mimeTypeRegex = /^(image)\/[a-zA-Z]+/
  const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

  if (!isValidFileFormat) {
    return reply.status(400).send()
  }

  const uploadPhotoUseCase = makeUploadPhotoUseCase()

  const { url } = await uploadPhotoUseCase.execute({
    upload,
    requestHostname: request.hostname,
    requestProtocol: request.protocol,
  })

  return reply.status(201).send({ url })
}
