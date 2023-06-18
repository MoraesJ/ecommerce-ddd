import UseCase from '../../application/use-case/use-case'
import HttpServer from './http-server'

export default class HttpController {
  constructor(
    readonly httpServer: HttpServer,
    readonly checkout: UseCase,
    readonly getProducts: UseCase
  ) {
    httpServer.on('post', '/checkout', async function (params: any, body: any) {
      const output = await checkout.execute(body)
      return output
    })

    httpServer.on('get', '/products', async function (params: any, body: any) {
      const output = await getProducts.execute()
      return output
    })
  }
}
