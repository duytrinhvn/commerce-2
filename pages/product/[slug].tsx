import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { useRouter } from 'next/router'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'
import SlideProvider from '@components/product/context'
import { getProductsByCollectionHandle } from '@framework/utils'

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }

  return array
}

export async function getStaticProps({
  params,
  locale,
  locales,
  preview
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const productPromise = commerce.getProduct({
    variables: { slug: params!.slug },
    config,
    preview
  })

  // const allProductsPromise = commerce.getAllProducts({
  //   variables: { first: 4 },
  //   config,
  //   preview,
  // })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const { product } = await productPromise
  const slugWords = product?.slug?.split('-')
  const slugLastWord = slugWords ? slugWords[slugWords.length - 1] : ''

  let relatedProducts = []

  // decide what related products to return
  switch (slugLastWord) {
    case 'pad':
      relatedProducts = await getProductsByCollectionHandle('deskmats')
      break
    case 'rest':
      relatedProducts = await getProductsByCollectionHandle('wrist-rest')
      break
  }
  // exclude the current product
  relatedProducts = relatedProducts?.filter(prod => prod.id !== product?.id)
  relatedProducts = relatedProducts ? shuffle(relatedProducts).slice(0, 4) : []

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pages,
      product,
      relatedProducts,
      categories
    },
    revalidate: 200
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await commerce.getAllProductPaths()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          products.forEach((product: any) => {
            arr.push(`/${locale}/product${product.path}`)
          })
          return arr
        }, [])
      : products.map((product: any) => `/product${product.path}`),
    fallback: 'blocking'
  }
}

export default function Slug({
  product,
  relatedProducts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <SlideProvider>
      <ProductView product={product} relatedProducts={relatedProducts} />
    </SlideProvider>
  )
}

Slug.Layout = Layout
