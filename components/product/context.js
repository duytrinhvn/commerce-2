import KeenSlider from 'keen-slider'
import React, { createContext, useState, useContext } from 'react'

const SlideContext = createContext()
export const useSlideContext = () => useContext(SlideContext)

export default function SlideProvider({ children }) {
  const [slider, setSlider] = useState()
  const [slideImages, setSlideImages] = useState()

  console.log(slideImages)

  const moveToSlide = (slideIndex, colorName) => {
    const colorNameLower = colorName.toLowerCase()
    // console.log(colorNameLower)

    // find index of the slide with altText equals to the colorname
    slideImages.map((img, i) => {
      if (img.altText === colorNameLower) {
        slider.moveToSlideRelative(i)
      }
    })
  }

  return (
    <SlideContext.Provider
      value={{ slider, setSlider, moveToSlide, slideImages, setSlideImages }}
    >
      {children}
    </SlideContext.Provider>
  )
}
