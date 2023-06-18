import { AuthGateway } from '../../application/gateway/auth-gateway'
import HttpClient from '../http/http-client'

export class AuthGatewayHttp implements AuthGateway {
  constructor(private readonly httpClient: HttpClient) {}

  async verify(token: string): Promise<any> {
    const response = await this.httpClient.post('http://localhost:3004/verify', token)
    return response.data
  }
}
