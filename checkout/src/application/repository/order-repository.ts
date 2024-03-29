import { Order } from './domain/entities/order'

export interface OrderRepository {
  save(order: Order): Promise<void>
  getById(id: string): Promise<Order>
  count(): Promise<number>
}
