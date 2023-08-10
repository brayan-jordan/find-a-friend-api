import { Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  items: Org[] = []

  async findById(id: string) {
    const item = this.items.find((org) => org.id === id)

    if (!item) {
      return null
    }

    return item
  }
}
