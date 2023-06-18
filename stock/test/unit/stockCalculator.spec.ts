import { StockCalculator } from '../../src/domain/entities/StockCalculator'
import { StockEntry } from '../../src/domain/entities/StockEntry'

test('Deve calcular o estoque de um determinado produto', function () {
  const stockEntries = [
    new StockEntry(1, 'in', 10),
    new StockEntry(1, 'out', 5),
    new StockEntry(1, 'in', 2),
  ]
  const total = StockCalculator.calculate(stockEntries)
  expect(total).toBe(7)
})
