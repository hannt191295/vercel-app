import { useState } from 'react'

export function useGallery(totalImages) {
  const [activeIndex, setActiveIndex] = useState(0)

  const showPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1))
  }

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalImages)
  }

  return { activeIndex, setActiveIndex, showPrevious, showNext }
}
