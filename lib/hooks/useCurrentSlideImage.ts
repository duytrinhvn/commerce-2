import KeenSlider from 'keen-slider'
import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from 'react'

export const useCurrentSlideImage = () => {
  const [destinationSlide, setDestinationSlide] = useState<number | undefined>()
  const [currentSlideImageIndex, setCurrentSlideImageIndex] = useState(1)

  const setCurrentSlide = (slideIndex: number) => {
    setCurrentSlideImageIndex(slideIndex)
  }

  const setDestination = (slideIndex: number) => {
    setDestinationSlide(slideIndex)
  }

  return {
    setDestination,
    destinationSlide,
    setDestinationSlide,
    setCurrentSlide,
    currentSlideImageIndex
  }
}
