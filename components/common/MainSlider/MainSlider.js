import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import s from './MainSlider.module.css'
import 'keen-slider/keen-slider.min.css'
import { Slide } from '@components/ui'

const MainSlider = () => {
  const [pause, setPause] = React.useState(false)
  const timer = React.useRef()
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    duration: 5000,
    dragStart: () => {
      setPause(true)
    },
    dragEnd: () => {
      setPause(false)
    },
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    }
  })

  React.useEffect(() => {
    sliderRef.current.addEventListener('mouseover', () => {
      setPause(true)
    })
    sliderRef.current.addEventListener('mouseout', () => {
      setPause(false)
    })
  }, [sliderRef])

  React.useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next()
      }
    }, 5000)
    return () => {
      clearInterval(timer.current)
    }
  }, [pause, slider])

  return (
    <>
      <div ref={sliderRef} className={`keen-slider ${s.slider}`}>
        <Slide
          title="Deskmat For Gamers"
          description="High Quality Deskmat For Improving Gaming Experience"
          backgroundImageSrc="/assets/monster-art-slide.jpg"
          href="/search/deskmats"
        />
      </div>
      {slider && (
        <div className={s.dots}>
          {[...Array(slider.details().size).keys()].map(idx => {
            return (
              <button
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
                className={`${s.dot} ${currentSlide === idx ? s.active : ''}`}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default MainSlider
