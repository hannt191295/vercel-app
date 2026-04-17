import { useEffect, useRef, useState } from 'react'

export function useMusic(musicUrl) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.65

    const syncState = () => setIsPlaying(!audio.paused)
    audio.addEventListener('play', syncState)
    audio.addEventListener('pause', syncState)

    let started = false

    const onInteraction = async () => {
      if (started) {
        removeListeners()
        return
      }
      try {
        await audio.play()
        started = true
        removeListeners()
      } catch {
        /* Keep trying on next interaction */
      }
    }

    const events = ['pointerdown', 'touchstart', 'click', 'keydown']

    const addListeners = () => {
      events.forEach((evt) => window.addEventListener(evt, onInteraction, { passive: true }))
    }

    const removeListeners = () => {
      events.forEach((evt) => window.removeEventListener(evt, onInteraction))
    }

    const tryAutoPlay = async () => {
      try {
        await audio.play()
        started = true
      } catch {
        addListeners()
      }
    }

    tryAutoPlay()

    return () => {
      audio.removeEventListener('play', syncState)
      audio.removeEventListener('pause', syncState)
      removeListeners()
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  const AudioElement = (
    <audio ref={audioRef} src={musicUrl} loop preload="auto" />
  )

  return { isPlaying, toggle, AudioElement }
}
