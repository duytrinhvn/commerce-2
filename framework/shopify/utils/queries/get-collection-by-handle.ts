import { productConnectionFragment } from './get-all-products-query'

const getCollectionByHandle = `
query getCollectionByHandle($handle:String = "deskmats") {
  collectionByHandle(handle: $handle) {
    products(first: 4, sortKey: CREATED, reverse: true) {
        ...productConnection
    }
  }
}

${productConnectionFragment}
`

export default getCollectionByHandle
