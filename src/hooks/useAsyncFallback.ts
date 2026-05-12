import { useEffect, useState } from 'react'

export function useAsyncFallback<T>(fallback: T, loader: () => Promise<T>) {
  const [data, setData] = useState<T>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      try {
        const loaded = await loader()
        if (active) {
          setData(loaded)
        }
      } catch (error) {
        console.warn('Uso dati statici di fallback:', error)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [loader])

  return { data, loading }
}
