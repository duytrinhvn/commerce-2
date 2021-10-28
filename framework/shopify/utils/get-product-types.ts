import { ShopifyConfig } from '../api'
import { API_TOKEN, API_URL } from '../const'
import { CollectionEdge } from '../schema'
import { normalizeCategory } from './normalize'
import getAllProductTypesQuery from './queries/get-all-products-types'

const getAllProductsTypes = async (): Promise<any[]> => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Shopify-Storefront-Access-Token': API_TOKEN!
  })
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query: getAllProductTypesQuery })
  })
  const jsonData = await response.json()
  const types = jsonData.data.productTypes.edges

  return (
    types.map((type: any) => {
      return {
        id: type.cursor,
        name: type.node,
        slug: type.node.toLowerCase().replace(/\s/g, '-'),
        path: `/${type.node.toLowerCase().replace(/\s/g, '-')}`
      }
    }) ?? []
  )
}

export default getAllProductsTypes

//   const headers = new Headers({
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     'X-Shopify-Storefront-Access-Token': API_TOKEN!
//   })
//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify({ query: getAllProductsTypes })
//   })
//   const jsonData = await response.json()
//   const types = jsonData.data.productTypes.edges
