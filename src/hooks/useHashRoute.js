import { useEffect, useState } from 'react'

const read = () => (window.location.hash.replace(/^#/, '') || '/')

/** Tiny hash router (no extra dependency). Links are plain <a href="#/videos">. */
export function useHashRoute() {
  const [path, setPath] = useState(read)
  useEffect(() => {
    const onChange = () => { setPath(read()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return path
}
