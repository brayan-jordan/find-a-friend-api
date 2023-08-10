import { UploadPhotoUseCase } from '../upload-photo'

export function makeUploadPhotoUseCase() {
  const useCase = new UploadPhotoUseCase()

  return useCase
}
