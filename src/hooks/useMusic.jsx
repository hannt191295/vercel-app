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

    const onFirstInteraction = async () => {
      try {
        await audio.play()
      } catch {
        /* Browser may still block */
      }
    }

    const addListeners = () => {
      window.addEventListener('pointerdown', onFirstInteraction, { once: true })
      window.addEventListener('keydown', onFirstInteraction, { once: true })
      window.addEventListener('touchstart', onFirstInteraction, { once: true })
    }

    const removeListeners = () => {
      window.removeEventListener('pointerdown', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
    }

    const tryAutoPlay = async () => {
      try {
        await audio.play()
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
    <audio ref={audioRef} src={musicUrl} loop preload="none" />
  )

  return { isPlaying, toggle, AudioElement }
}
