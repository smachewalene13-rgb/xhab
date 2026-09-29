export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers / non-secure contexts
    const el = document.createElement('textarea')
    el.value = text
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    let ok = false
    try { ok = document.execCommand('copy') } catch { ok = false }
    document.body.removeChild(el)
    return ok
  }
}
