export class CurrencyTable {
  private _value: { [currency: string]: number }

  constructor() {
    this._value = {
      BRL: 1,
    }
  }

  getCurrency(currency: string) {
    return this._value[currency]
  }

  addCurrency(currency: string, value: number) {
    this._value[currency] = value
  }
}
