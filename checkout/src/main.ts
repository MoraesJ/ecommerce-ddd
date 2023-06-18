import AuthDecorator from './application/decorators/authDecorator'
import { Checkout } from './application/use-case/checkout'
import GetProducts from './application/use-case/get-products'
import { CurrencyGatewayHttp } from './infra/gateway/currencyGatewayHttp'
import AxiosAdapter from './infra/http/axios-adapter'
import ExpressAdapter from './infra/http/express-adapter'
import HttpController from './infra/http/http-controller'
import { InMemoryCouponRepository } from './infra/repository/in-memory-coupon-repository'
import { InMemoryOrderRepository } from './infra/repository/in-memory-order-repository'
import { InMemoryProductRepository } from './infra/repository/in-memory-product-repository'

const httpClient = new AxiosAdapter()
const currencyGateway = new CurrencyGatewayHttp()
const productRepository = new InMemoryProductRepository()
const couponRepository = new InMemoryCouponRepository()
const orderRepository = new InMemoryOrderRepository()
const checkout = new Checkout(currencyGateway, orderRepository, couponRepository)
const getProducts = new GetProducts(productRepository)
const httpServer = new ExpressAdapter()
new HttpController(
  httpServer,
  new AuthDecorator(checkout),
  new AuthDecorator(getProducts)
)
console.log('listening 3000')
httpServer.listen(3000)
