export interface StockGateway {
  decrementStock(input: Input): Promise<void>
}

export type Input = {
  items: { idProduct: string; quantity: number }[]
}
