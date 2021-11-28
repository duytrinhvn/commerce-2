import { ShopifyConfig } from '../api'
import { API_TOKEN, API_URL } from '../const'
import { CollectionEdge } from '../schema'
import { normalizeProduct } from './normalize'
import getCollectionByHandle from './queries/get-collection-by-handle'

const getProductsByCollectionHandle = async (): Promise<any[]> => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Shopify-Storefront-Access-Token': API_TOKEN!
  })
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query: getCollectionByHandle })
  })
  const jsonData = await response.json()
  const products = jsonData.data.collectionByHandle.products.edges

  return products?.map(({ node }: any) => normalizeProduct(node))
}

export default getProductsByCollectionHandle
