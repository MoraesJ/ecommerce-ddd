import { CalculateFreight } from './src/application/use-case/calculate-freight'
import ExpressAdapter from './src/infra/http/express-adapter'
import HttpController from './src/infra/http/http-controller'

const calculateFreight = new CalculateFreight()
const httpServer = new ExpressAdapter()
new HttpController(httpServer, calculateFreight)
httpServer.listen(3002)
