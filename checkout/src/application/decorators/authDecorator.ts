import { AuthGatewayHttp } from '../../infra/gateway/auth-gateway-http'
import AxiosAdapter from '../../infra/http/axios-adapter'
import { AuthGateway } from '../gateway/auth-gateway'
import UseCase from '../use-case/use-case'

export default class AuthDecorator implements UseCase {
  constructor(
    private readonly useCase: UseCase,
    private readonly authGateway = new AuthGatewayHttp(new AxiosAdapter())
  ) {}

  async execute(input: any): Promise<any> {
    try {
      const payload = await this.authGateway.verify(input.token)
      input.email = payload.email
      return this.useCase.execute(input)
    } catch (err) {
      throw new Error('Auth error')
    }
  }
}
