import { useCallback, useEffect, useState } from 'react'
import type { CrudRepository } from '../services/mockCrudRepository'

export function useCrudResource<T extends { id: string }>(repository: CrudRepository<T>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await repository.list())
    } finally {
      setLoading(false)
    }
  }, [repository])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const createItem = async (payload: T) => {
    await repository.create(payload)
    await refresh()
  }

  const updateItem = async (id: string, payload: T) => {
    await repository.update(id, payload)
    await refresh()
  }

  const deleteItem = async (id: string) => {
    await repository.remove(id)
    await refresh()
  }

  return {
    items,
    loading,
    createItem,
    updateItem,
    deleteItem,
    refresh,
  }
}
