import { useEffect, useState } from 'react'

/** Runs an async loader once on mount. Returns { data, loading, error }. */
export function useAsync(loader, fallback = null) {
  const [state, setState] = useState({ data: fallback, loading: true, error: null })

  useEffect(() => {
    let alive = true
    loader()
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((error) => alive && setState({ data: fallback, loading: false, error }))
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}
