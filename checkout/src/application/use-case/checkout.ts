import { CurrencyGateway } from '../gateway/currency-gateway'
import { CurrencyGatewayHttp } from '../../infra/gateway/currencyGatewayHttp'
import { Cpf } from '../../domain/entities/cpf'
import { CurrencyTable } from '../../domain/entities/currency-table'
import { Order } from '../../domain/entities/order'
import { OrderItem } from '../../domain/entities/order-item'
import { InMemoryCouponRepository } from '../../infra/repository/in-memory-coupon-repository'

import { CouponRepository } from '../repository/coupon-repository'
import { OrderRepository } from '../repository/order-repository'
import { InMemoryOrderRepository } from '../../infra/repository/in-memory-order-repository'
import FreightGateway, { FreightGatewayInput } from '../gateway/freight-gateway'
import FreightGatewayHttp from '../../infra/gateway/freight-gateway-http'
import AxiosAdapter from '../../infra/http/axios-adapter'
import CatalogGateway from '../gateway/catalog-gateway'
import { CatalogGatewayHttp } from '../../infra/gateway/catalog-gateway-http'
import UseCase from './use-case'
import { StockGateway } from '../gateway/stock-gateway'
import { StockGatewayHttp } from '../../infra/gateway/stock-gateway-http'
import { Queue } from '../../infra/queue/Queue'

interface ItemInput {
  idProduct: string
  quantity: number
  price?: number
}

interface Input {
  cpf: string
  items: ItemInput[]
  from?: string
  to?: string
  coupon?: string
}

interface Output {
  total: number
  freight: number
}

export class Checkout implements UseCase {
  constructor(
    private currencyGateway: CurrencyGateway = new CurrencyGatewayHttp(),
    private orderRepository: OrderRepository = new InMemoryOrderRepository(),
    private couponRepository: CouponRepository = new InMemoryCouponRepository(),
    readonly freightGateway: FreightGateway = new FreightGatewayHttp(new AxiosAdapter()),
    readonly catalogGateway: CatalogGateway = new CatalogGatewayHttp(new AxiosAdapter()),
    readonly stockGateway: StockGateway = new StockGatewayHttp(new AxiosAdapter()),
    readonly queue?: Queue
  ) {}

  async execute(input: Input): Promise<Output> {
    const currencies = await this.currencyGateway.getCurrencies()
    const currencyTable = new CurrencyTable()
    currencyTable.addCurrency('USD', currencies.usd)
    const sequence = await this.orderRepository.count()
    const cpf = new Cpf(input.cpf)
    const order = new Order(cpf, new Date(), sequence)
    const freightInput: FreightGatewayInput = {
      items: [],
      from: input.from,
      to: input.to,
    }
    if (input.items) {
      for (const item of input.items) {
        const product = await this.catalogGateway.getProduct(item.idProduct)
        const orderItem = new OrderItem(product, item.quantity)
        order.addItem(orderItem)
        freightInput.items.push({
          width: product.width,
          height: product.height,
          length: product.lenght,
          weight: product.weight,
          quantity: orderItem.quantity,
        })
      }
    }

    const freightOutput = await this.freightGateway.calculateFreight(freightInput)
    const freight = freightOutput.freight
    if (input.from && input.to) {
      order.freight = freight
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon)
      order.addCoupon(coupon)
    }
    let total = order.total
    await this.orderRepository.save(order)
    // await this.stockGateway.decrementStock(input)
    if (this.queue) {
      this.queue.publish('decrementStock', input)
    }

    return {
      total,
      freight,
    }
  }
}
