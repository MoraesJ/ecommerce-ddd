import { OrderRepository } from '../../application/repository/order-repository'
import { Order } from '../../domain/entities/order'

export class InMemoryOrderRepository implements OrderRepository {
  private _orders: Order[] = []

  async save(order: Order): Promise<void> {
    this._orders.push(order)
  }

  async getById(id: string): Promise<Order> {
    const order = this._orders.find((order) => order.id === id)
    if (!order) {
      throw new Error('Order not found')
    }
    return order
  }

  async count(): Promise<number> {
    return this._orders.length
  }
}
