import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getAllProductsTypes, getProductTypes } from '@framework/utils'
import commerce from '@lib/api/commerce'
import { API_TOKEN, API_URL } from '@framework/const'

export async function getSearchStaticProps({
  preview,
  locale,
  locales
}: GetStaticPropsContext) {
  // TODO: Refactor required
  // const headers = new Headers({
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  //   'X-Shopify-Storefront-Access-Token': API_TOKEN!
  // })
  // const response = await fetch(API_URL, {
  //   method: 'POST',
  //   headers: headers,
  //   body: JSON.stringify({ query: getAllProductsTypes })
  // })
  // const jsonData = await response.json()
  // const types = jsonData.data.productTypes.edges

  const types = await getProductTypes()
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  return {
    props: {
      pages,
      categories,
      brands,
      productTypes: types
    },
    revalidate: 200
  }
}

export type SearchPropsType = InferGetStaticPropsType<
  typeof getSearchStaticProps
>
