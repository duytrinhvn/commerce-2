import { useEffect, useState } from 'react'
import getSlug from './get-slug'

export function useSearchMeta(asPath: string) {
  const [pathname, setPathname] = useState<string>('/search')
  const [category, setCategory] = useState<string | undefined>()
  const [collection, setCollection] = useState<string | undefined>()
  const [brand, setBrand] = useState<string | undefined>()

  useEffect(() => {
    // Only access asPath after hydration to avoid a server mismatch
    const path = asPath.split('?')[0]
    const parts = path.split('/')

    if(parts[2] === 'collections') {
      setCategory(undefined)
      let type = parts[3]
      if(type !== '') setCollection(type)
    }
    else {
      setCollection(undefined)
      let c = parts[2]
      let b = parts[3]

      if (c === 'designers') {
        c = parts[4]
      } else {
        if (c !== category) setCategory(c)
        if (b !== brand) setBrand(b)
      }

      if (path !== pathname) setPathname(path)
    }
  }, [asPath, pathname, category, brand, collection])

  return { pathname, category, brand, collection }
}

// Removes empty query parameters from the query object
export const filterQuery = (query: any) =>
  Object.keys(query).reduce<any>((obj, key) => {
    if (query[key]?.length) {
      obj[key] = query[key]
    }
    return obj
  }, {})

export const getCategoryPath = (path: string, brand?: string) => {
  const category = getSlug(path)

  return `/search${brand ? `/designers/${brand}` : ''}${
    category ? `/${category}` : ''
  }`
}

export const getDesignerPath = (path: string, category?: string) => {
  const designer = getSlug(path).replace(/^brands/, 'designers')

  return `/search${designer ? `/${designer}` : ''}${
    category ? `/${category}` : ''
  }`
}
