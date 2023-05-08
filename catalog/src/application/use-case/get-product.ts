import { ProductRepository } from '../repository/product-repository'

export default class GetProduct {
  constructor(readonly productRepository: ProductRepository) {}

  async execute(idProduct: string): Promise<Output> {
    const product = await this.productRepository.getProduct(idProduct)
    const output = Object.assign(product, {
      volume: product.volume,
      density: product.density,
    })
    return output
  }
}

type Output = {
  id: string
  description: string
  price: number
  width: number
  height: number
  length: number
  weight: number
  currency: string
  volume: number
  density: number
}
