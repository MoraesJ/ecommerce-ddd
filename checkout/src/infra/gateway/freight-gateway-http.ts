import FreightGateway, {
  FreightGatewayInput,
} from '../../application/gateway/freight-gateway'
import HttpClient from '../http/http-client'

export default class FreightGatewayHttp implements FreightGateway {
  constructor(readonly httpClient: HttpClient) {}

  async calculateFreight(input: FreightGatewayInput) {
    const response = await this.httpClient.post(
      'http://localhost:3002/calculateFreight',
      input
    )
    return response
  }
}
