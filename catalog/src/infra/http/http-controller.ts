import GetProduct from '../../application/use-case/get-product'
import GetProducts from '../../application/use-case/get-products'
import HttpServer from './http-server'

export default class HttpController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getProducts: GetProducts,
    readonly getProduct: GetProduct
  ) {
    httpServer.on('get', '/getProduct', async function (params: any, body: any) {
      const output = await getProduct.execute(body)
      return output
    })
  }
}
