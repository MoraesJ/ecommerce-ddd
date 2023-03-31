import axios from 'axios'
import { CurrencyGateway } from './currencyGateway'

export class CurrencyGatewayHttp implements CurrencyGateway {
  async getCurrencies(): Promise<any> {
    const response = await axios.get('http://localhost:3001/currencies')
    return response.data
  }
}
