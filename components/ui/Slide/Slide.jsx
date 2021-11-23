import React from 'react'
import s from './Slide.module.css'
import Image from 'next/image'
import { Button } from '..'
import Link from '../Link'

const Slide = ({ title, description, href, backgroundImageSrc }) => {
  return (
    <div
      className={`keen-slider__slide ${s.slide}`}
      // style={{ backgroundImage: `url(${backgroundImageSrc})` }}
    >
      <div
        className={s.imageContainer}
        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
      ></div>
      <div className={s.descWrapper}>
        <h1 className="font-extrabold text-4xl mb-2 lg:text-6xl lg:mb-8">
          {title}
        </h1>
        <p className="text-xl md:text-2xl">{description}</p>
        <Button Component="a" href={href} variant="slide">
          SEE MORE
        </Button>
      </div>
    </div>
  )
}

export default Slide
