import DecrementStock from '../../application/use-case/decrement-stock.use-case'
import { Queue } from './Queue'

export class QueueController {
  constructor(readonly queue: Queue, readonly decrementStock: DecrementStock) {
    queue.on('decrementStock', async function (input: any) {
      await decrementStock.execute(input)
    })
  }
}
