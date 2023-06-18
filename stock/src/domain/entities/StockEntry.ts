export class StockEntry {
  constructor(
    readonly idProduct: string,
    readonly operation: 'in' | 'out',
    readonly quantity: number
  ) {
    if (quantity < 1) throw new Error('Invalid quantity')
  }
}
