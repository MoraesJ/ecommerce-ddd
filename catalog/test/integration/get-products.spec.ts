import GetProducts from '../../src/application/use-case/get-products'
import { InMemoryProductRepository } from '../../src/infra/repository/in-memory-product-repository'

test('Deve listar os produtos', async function () {
  const productRepository = new InMemoryProductRepository()
  const getProducts = new GetProducts(productRepository)
  const output = await getProducts.execute()
  expect(output).toHaveLength(0)
})
