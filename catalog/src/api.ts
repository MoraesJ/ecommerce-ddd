import GetProduct from './application/use-case/get-product'
import GetProducts from './application/use-case/get-products'
import ExpressAdapter from './infra/http/express-adapter'
import HttpController from './infra/http/http-controller'
import { InMemoryProductRepository } from './infra/repository/in-memory-product-repository'

const productRepository = new InMemoryProductRepository()
const getProducts = new GetProducts(productRepository)
const getProduct = new GetProduct(productRepository)
const httpServer = new ExpressAdapter()
new HttpController(httpServer, getProducts, getProduct)
httpServer.listen(3003)
