export interface CrudRepository<T extends { id: string }> {
  list: () => Promise<T[]>
  create: (payload: T) => Promise<T>
  update: (id: string, payload: T) => Promise<T>
  remove: (id: string) => Promise<void>
}

const wait = async () => new Promise((resolve) => window.setTimeout(resolve, 180))

export function createMockCrudRepository<T extends { id: string }>(initialItems: T[]): CrudRepository<T> {
  let items = [...initialItems]

  return {
    async list() {
      await wait()
      return [...items]
    },
    async create(payload) {
      await wait()
      items = [payload, ...items]
      return payload
    },
    async update(id, payload) {
      await wait()
      items = items.map((item) => (item.id === id ? payload : item))
      return payload
    },
    async remove(id) {
      await wait()
      items = items.filter((item) => item.id !== id)
    },
  }
}
