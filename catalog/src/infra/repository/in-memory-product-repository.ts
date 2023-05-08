import { ProductRepository } from '../../application/repository/product-repository'
import { Item } from '../../domain/entities/item'

export class InMemoryProductRepository implements ProductRepository {
  private items: Item[] = []

  async getProducts(): Promise<Item[]> {
    return this.items
  }

  async getProduct(id: string): Promise<Item> {
    const product = this.items.find((item) => item.id === id)
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  }
}
