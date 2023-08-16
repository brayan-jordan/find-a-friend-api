import { Prisma } from '@prisma/client'

type PetWithRelations = Prisma.PetGetPayload<{
  include: {
    org: true
    photos: true
  }
}>
