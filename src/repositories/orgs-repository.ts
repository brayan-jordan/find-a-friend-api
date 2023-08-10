import { Org } from '@prisma/client'

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
}
