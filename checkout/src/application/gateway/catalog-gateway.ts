import { Item } from '../../domain/entities/item'

export default interface CatalogGateway {
  getProducts(): Promise<Item[]>
  getProduct(id: string): Promise<Item>
}
