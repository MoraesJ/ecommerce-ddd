import CatalogGateway from '../../application/gateway/catalog-gateway'
import { Item } from '../../domain/entities/item'
import HttpClient from '../http/http-client'

export class CatalogGatewayHttp implements CatalogGateway {
  constructor(readonly httpClient: HttpClient) {}
  getPrduct(id: string): Promise<Item> {
    throw new Error('Method not implemented.')
  }

  async getProducts(): Promise<Item[]> {
    const response = await this.httpClient.get('http://localhost:3003/products')
    const products: Item[] = []
    for (const productData of response) {
      products.push(
        new Item(
          productData.id,
          productData.description,
          productData.price,
          productData.height,
          productData.length,
          productData.width,
          productData.weight,
          productData.currency
        )
      )
    }
    return products
  }

  async getProduct(id: string): Promise<Item> {
    const productData = await this.httpClient.get(`http://localhost:3003/products/${id}`)
    return new Item(
      productData.id,
      productData.description,
      productData.price,
      productData.height,
      productData.length,
      productData.width,
      productData.weight,
      productData.currency
    )
  }
}
