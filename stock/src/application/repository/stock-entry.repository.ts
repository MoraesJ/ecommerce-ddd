import { StockEntry } from '../../domain/entities/StockEntry'

export default interface StockEntryRepository {
  save(stockEntry: StockEntry): Promise<void>
  list(idProduct: string): Promise<StockEntry[]>
}
