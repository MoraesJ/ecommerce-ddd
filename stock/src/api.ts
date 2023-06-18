import StockEntryRepository from './application/repository/stock-entry.repository'
import CalculateStock from './application/use-case/calculate-stock.use-case'
import DecrementStock from './application/use-case/decrement-stock.use-case'
import { StockEntry } from './domain/entities/StockEntry'
import ExpressAdapter from './infra/http/express-adapter'
import HttpController from './infra/http/http-controller'
import { QueueController } from './infra/queue/queue-controller'
import { RabbitMQAdapter } from './infra/queue/RabbitMQAdapter'

async function main() {
  const stockEntries: StockEntry[] = [new StockEntry('abc', 'in', 20)]
  const stockEntryRepository: StockEntryRepository = {
    async save(stockEntry: StockEntry) {
      stockEntries.push(stockEntry)
    },
    async list(idProduct: string) {
      return stockEntries.filter(
        (stockEntry: StockEntry) => stockEntry.idProduct === idProduct
      )
    },
  }
  const decrementStock = new DecrementStock(stockEntryRepository)
  const calculateStock = new CalculateStock(stockEntryRepository)
  const httpServer = new ExpressAdapter()
  new HttpController(httpServer, decrementStock, calculateStock)
  const queue = new RabbitMQAdapter()
  await queue.connect()
  new QueueController(queue, decrementStock)
  console.log('listen port 3005')
  httpServer.listen(3005)
}

main()
