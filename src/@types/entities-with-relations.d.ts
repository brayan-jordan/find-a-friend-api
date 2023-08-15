import { Prisma } from '@prisma/client'

type PetWithOrg = Prisma.PetGetPayload<{
  include: {
    org: true
    photos: true
  }
}>
