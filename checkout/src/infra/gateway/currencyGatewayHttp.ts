import axios from 'axios'
import {
  CurrencyGateway,
  CurrencyOutput,
} from '../../application/gateway/currency-gateway'

export class CurrencyGatewayHttp implements CurrencyGateway {
  async getCurrencies(): Promise<CurrencyOutput> {
    const response = await axios.get('http://localhost:3001/currencies')
    return response.data
  }
}
