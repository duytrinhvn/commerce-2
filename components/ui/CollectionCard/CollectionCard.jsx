import React from 'react'
import Link from '../Link'
import s from './CollectionCard.module.css'

const CollectionCard = ({ collection }) => {
  console.log('COLLECTION', collection)
  return (
    <Link
      href={`/search/collections/${collection.slug}`}
      className={s.root}
      style={{
        backgroundImage: `url('/assets/${collection.slug}.jpg')`
      }}
    >
      <div className={s.titleWrapper}>
        <p className="">{collection.name}</p>
      </div>
    </Link>
  )
}

export default CollectionCard
