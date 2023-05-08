import { ProductRepository } from '../repository/product-repository'

export default class GetProducts {
  constructor(readonly productRepository: ProductRepository) {}

  async execute(): Promise<Output> {
    const output: Output = []
    const products = await this.productRepository.getProducts()
    for (const product of products) {
      output.push({
        idProduct: product.id,
        description: product.description,
        price: product.price,
      })
    }
    return output
  }
}

type Output = {
  idProduct: string
  description: string
  price: number
}[]
