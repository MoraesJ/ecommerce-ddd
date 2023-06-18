export class Coupon {
  private _code: string
  private _percentage: number
  private _expireDate: Date

  constructor(code: string, percentage: number, expireDate: Date) {
    this.validateCode(code)
    this._code = code
    this.validateValue(percentage)
    this._percentage = percentage
    this._expireDate = expireDate
  }

  get code() {
    return this._code
  }

  isExpired(today: Date): Boolean {
    return today.getTime() > this._expireDate.getTime()
  }

  calculateDiscount(amount: number) {
    return amount * this._percentage
  }

  private validateValue(value: number) {
    if (value < 0) {
      throw new Error('Invalid discount value')
    }
  }

  private validateCode(value: string) {
    if (value === '' || value.length < 3) {
      throw new Error('Invalid coupon code')
    }
  }
}
