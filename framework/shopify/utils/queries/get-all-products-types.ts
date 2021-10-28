const getAllProductTypesQuery = `
  query getAllProductsTypes($first: Int = 100) {
    productTypes(first: $first) {
      edges {
        cursor
        node
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

export default getAllProductTypesQuery
