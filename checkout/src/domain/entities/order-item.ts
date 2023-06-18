import { CurrencyTable } from './currency-table'
import { Item } from './item'

export class OrderItem {
  private _item: Item
  private _quantity: number
  private _currencyTable: CurrencyTable

  constructor(item: Item, quantity: number) {
    this._item = item
    this.validateQuantity(quantity)
    this._quantity = quantity
    this._currencyTable = new CurrencyTable()
  }

  get total() {
    return (
      this._item.price *
      this._quantity *
      this._currencyTable.getCurrency(this._item.currency)
    )
  }

  get quantity() {
    return this._quantity
  }

  get item() {
    return this._item
  }

  private validateQuantity(value: number) {
    if (value < 0) {
      throw new Error('Invalid quantity')
    }
  }
}
