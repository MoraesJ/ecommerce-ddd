import { CurrencyTable } from './currency-table'

export class Item {
  private readonly _id: string
  private readonly _description: string
  private readonly _price: number
  private readonly _height: number
  private readonly _length: number
  private readonly _width: number
  private readonly _weight: number
  private readonly _currency: string

  constructor(
    id: string,
    description: string,
    price: number,
    height: number,
    length: number,
    width: number,
    weight: number,
    currency: string
  ) {
    this._id = id
    this.validateDescription(description)
    this._description = description
    this.validatePrice(price)
    this._price = price
    this.validateDimensions()
    this._height = height
    this._length = length
    this._width = width
    this.validateWeight()
    this._weight = weight
    this._currency = currency
  }

  get description() {
    return this._description
  }

  get price() {
    return this._price
  }

  get id() {
    return this._id
  }

  get volume() {
    return this._height * this._length * this._width
  }

  get currency() {
    return this._currency
  }

  get weight() {
    return this._weight
  }

  get height() {
    return this._height
  }

  get lenght() {
    return this._length
  }

  get width() {
    return this._width
  }

  private validatePrice(value: number) {
    if (value <= 0) throw new Error('Invalid price')
  }

  private validateDescription(description: string) {
    if (description === '') {
      throw new Error('Invalid description')
    }
  }

  private validateDimensions() {
    if (this._height <= 0 || this._length <= 0 || this._width <= 0) {
      throw new Error('Invalid dimension')
    }
  }

  private validateWeight() {
    if (this._weight <= 0) {
      throw new Error('Invalid weight')
    }
  }
}
