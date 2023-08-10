import { randomUUID } from 'node:crypto'
import { MultipartFile } from '@fastify/multipart'
import { extname, resolve } from 'node:path'
import { createWriteStream, mkdirSync } from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'

interface UploadPhotoUseCaseRequest {
  upload: MultipartFile
  requestProtocol: string
  requestHostname: string
}

interface UploadPhotoUseCaseResponse {
  url: string
}

export class UploadPhotoUseCase {
  pump = promisify(pipeline)
  async execute({
    upload,
    requestHostname,
    requestProtocol,
  }: UploadPhotoUseCaseRequest): Promise<UploadPhotoUseCaseResponse> {
    const fileId = randomUUID()
    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension)

    const uploadDirectory = resolve(__dirname, '../../uploads/')
    const fullUploadPath = resolve(uploadDirectory, fileName)

    mkdirSync(uploadDirectory, { recursive: true })

    const writeStream = createWriteStream(fullUploadPath)

    await this.pump(upload.file, writeStream)

    const fullUrl = requestProtocol.concat('://').concat(requestHostname)
    const url = new URL(`/photos/${fileName}`, fullUrl).toString()

    return {
      url,
    }
  }
}
