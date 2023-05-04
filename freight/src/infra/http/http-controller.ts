import { CalculateFreight } from '../../application/use-case/calculate-freight'
import HttpServer from './http-server'

export default class HttpController {
  constructor(
    readonly httpServer: HttpServer,
    readonly calculateFreight: CalculateFreight
  ) {
    httpServer.on('post', '/calculateFreight', async function (params: any, body: any) {
      const output = await calculateFreight.execute(body)
      return output
    })
  }
}
