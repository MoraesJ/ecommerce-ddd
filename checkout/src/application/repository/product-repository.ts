import { Item } from '../../domain/entities/item'

export interface ProductRepository {
  getProduct(id: string): Promise<Item>
  getProducts(): Promise<Item[]>
}
