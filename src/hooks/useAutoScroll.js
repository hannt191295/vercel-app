import { useEffect } from 'react'

export function useAutoScroll() {
  useEffect(() => {
    let frameId = 0
    let lastTime = performance.now()
    let isRunning = true

    const stopAutoScroll = () => {
      isRunning = false
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('wheel', stopAutoScroll)
      window.removeEventListener('touchmove', stopAutoScroll)
      window.removeEventListener('keydown', stopAutoScroll)
    }

    const step = (now) => {
      if (!isRunning) return

      const documentHeight = document.documentElement.scrollHeight
      const viewportBottom = window.scrollY + window.innerHeight

      if (viewportBottom >= documentHeight - 2) {
        stopAutoScroll()
        return
      }

      const delta = now - lastTime
      lastTime = now
      const pixels = Math.max(0.35, (delta / 16) * 0.55)
      window.scrollBy(0, pixels)
      frameId = window.requestAnimationFrame(step)
    }

    window.addEventListener('wheel', stopAutoScroll, { passive: true })
    window.addEventListener('touchmove', stopAutoScroll, { passive: true })
    window.addEventListener('keydown', stopAutoScroll)
    frameId = window.requestAnimationFrame(step)

    return () => stopAutoScroll()
  }, [])
}
