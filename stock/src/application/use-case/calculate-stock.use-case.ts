import { StockCalculator } from '../../domain/entities/StockCalculator'
import StockEntryRepository from '../repository/stock-entry.repository'

export default class CalculateStock {
  constructor(readonly stockEntryRepository: StockEntryRepository) {}

  async execute(input: { idProduct: number }): Promise<Output> {
    const stockEntries = await this.stockEntryRepository.list(input.idProduct)
    const total = StockCalculator.calculate(stockEntries)
    return {
      total,
    }
  }
}

type Output = {
  total: number
}
