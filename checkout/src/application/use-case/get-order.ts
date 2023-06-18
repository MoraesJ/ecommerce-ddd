import { InMemoryOrderRepository } from '../in-memory-order-repository'
import { OrderRepository } from '../order-repository'

type Output = {
  code: string
  total: number
  freight: number
}

export class GetOrder {
  constructor(
    private readonly orderRepository: OrderRepository = new InMemoryOrderRepository()
  ) {}

  async execute(id: string): Promise<Output> {
    const order = await this.orderRepository.getById(id)
    return {
      code: order.code,
      freight: order.freight,
      total: order.total,
    }
  }
}
