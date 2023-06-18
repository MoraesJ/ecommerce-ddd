import { Coupon } from './coupon'
import { Cpf } from './cpf'
import { OrderItem } from './order-item'
import crypto from 'crypto'

export class Order {
  private _id: string
  private _orderItems: OrderItem[]
  private _coupon?: Coupon
  private _cpf: Cpf
  private _date: Date
  private _sequence: number
  private _code: string
  private _freight: number = 0

  constructor(cpf: Cpf, date: Date, sequence: number = 1, id?: string) {
    this._id = id ?? crypto.randomUUID()
    this._orderItems = []
    this._cpf = cpf
    this._date = date
    this._sequence = sequence
    this._code = `${date.getFullYear()}${new String(sequence).padStart(8, '0')}`
  }

  get id(): string {
    return this._id
  }

  get code(): string {
    return this._code
  }

  get freight(): number {
    return this._freight
  }

  set freight(value: number) {
    this._freight = value
  }

  get total(): number {
    let total = 0
    for (const item of this._orderItems) {
      total += item.total
    }

    return this.applyCouponDiscount(total)
  }

  addItem(item: OrderItem) {
    if (this.hasAlreadyAdded(item)) {
      throw new Error('Already has this item')
    }

    this._orderItems.push(item)
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired(new Date())) {
      this._coupon = coupon
    }
  }

  private applyCouponDiscount(value: number) {
    if (this._coupon) {
      const finalValue = value - this._coupon.calculateDiscount(value)
      return finalValue
    }
    return value
  }

  private hasAlreadyAdded(newOrderItem: OrderItem) {
    return this._orderItems.some(
      (orderItem) => orderItem.item.id === newOrderItem.item.id
    )
  }
}
