import commerce from '@lib/api/commerce'
import { FeaturedCategories, Layout, MainSlider } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero, Separator, CollectionCard } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getProductTypes } from '@framework/utils'
import { Sidebar } from '@components/ui'

export async function getStaticProps({
  preview,
  locale,
  locales
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { relevance: 'newest', first: 6, reverse: true },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any)
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  const collections = await getProductTypes()

  return {
    props: {
      products,
      categories,
      brands,
      pages,
      collections
    },
    revalidate: 60
  }
}

export default function Home({
  products,
  categories,
  collections
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <MainSlider />

      <FeaturedCategories categories={categories} />

      <Separator />

      <Grid layout="normal" title="New Arrivals">
        {products.slice(0, 6).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540
            }}
          />
        ))}
      </Grid>
      {/* <Marquee variant="secondary">
        {products.slice(0, 8).map((product: any, i: number) => (
          <ProductCard className="mr-10" key={product.id} product={product} variant="slim" />
        ))}
      </Marquee> */}

      <Separator />

      <Hero
        className="my-10"
        headline="Enhancing Gaming Experience."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
        backgroundImg="/assets/bg-hero2.jpg"
      />

      <Separator />

      <Grid layout="normal" variant="default" title="Collections">
        {collections.map((collection: any, i: number) => {
          if (collection.id) {
            return (
              <CollectionCard
                key={collection.id}
                collection={collection}
                // imgProps={{
                //   width: i === 0 ? 1080 : 540,
                //   height: i === 0 ? 1080 : 540
                // }}
              />
            )
          }
        })}
      </Grid>
      
    </>
  )
}

Home.Layout = Layout
