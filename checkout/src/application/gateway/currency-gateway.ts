export interface CurrencyOutput {
  usd: number
}

export interface CurrencyGateway {
  getCurrencies(): Promise<CurrencyOutput>
}
