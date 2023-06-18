import StockEntryRepository from '../../src/application/repository/stock-entry.repository'
import CalculateStock from '../../src/application/use-case/calculate-stock.use-case'
import DecrementStock from '../../src/application/use-case/decrement-stock.use-case'
import { StockEntry } from '../../src/domain/entities/StockEntry'

test('Deve decrementar o estoque', async function () {
  const stockEntries: StockEntry[] = [new StockEntry(1, 'in', 20)]
  const stockEntryRepository: StockEntryRepository = {
    async save(stockEntry: StockEntry) {
      stockEntries.push(stockEntry)
    },
    async list(idProduct: number) {
      return stockEntries.filter(
        (stockEntry: StockEntry) => stockEntry.idProduct === idProduct
      )
    },
  }
  const decrementStock = new DecrementStock(stockEntryRepository)
  const input = {
    items: [
      { idProduct: 1, quantity: 10 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  }
  await decrementStock.execute(input)
  const calculateStock = new CalculateStock(stockEntryRepository)
  const output = await calculateStock.execute({ idProduct: 1 })
  expect(output.total).toBe(10)
})
