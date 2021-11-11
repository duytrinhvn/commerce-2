import React, { useEffect, useState } from 'react'
import s from './FeaturedCategories.module.css'
import Image from 'next/image'
import Link from '@components/ui/Link'

const FeaturedCategories = ({ categories }) => {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    if (window) {
      setScreenWidth(window.innerWidth)
    }
  }, [])

  if (!screenWidth) {
    return <div></div>
  }

  return (
    <div className={s.featuredCategories}>
      {categories.map((cat, i) => (
        <Link
          href={'/search' + cat.path}
          key={`${cat.id}${i}`}
          className={s.category}
        >
          <div className={`${s.imgDiv} ${s.floatTop}`}>
            <Image
              className={s.categoryImg}
              src={`/assets/category-${i}.png`}
              layout="fill"
              alt={cat.name}
            />
          </div>
          <div className={`${s.descriptionDiv} ${s.floatBottom}`}>
            <h2 className={s.categoryTitle}>SHOP {cat.name.toUpperCase()}</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default FeaturedCategories
