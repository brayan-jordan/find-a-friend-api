import { PrismaPhotosRepository } from '@/repositories/prisma/prisma-photos-repository'
import { UploadPhotoUseCase } from '../upload-photo'

export function makeUploadPhotoUseCase() {
  const photosRepository = new PrismaPhotosRepository()
  const useCase = new UploadPhotoUseCase(photosRepository)

  return useCase
}
