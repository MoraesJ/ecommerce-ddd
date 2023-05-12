import ZipcodeRepository from './application/repository/zipcode.repository'
import { CalculateFreight } from './application/use-case/calculate-freight'
import Zipcode from './domain/entities/zipcode'
import ExpressAdapter from './infra/http/express-adapter'
import HttpController from './infra/http/http-controller'

const zipcodeRepository: ZipcodeRepository = {
  async get(code: string): Promise<Zipcode | undefined> {
    if (code === '22060030') {
      return new Zipcode('22060030', '', '', -27.5945, -48.5477)
    }
    if (code === '88015600') {
      return new Zipcode('88015600', '', '', -22.9129, -43.2003)
    }
  },
}

const calculateFreight = new CalculateFreight(zipcodeRepository)
const httpServer = new ExpressAdapter()
new HttpController(httpServer, calculateFreight)
httpServer.listen(3002)
