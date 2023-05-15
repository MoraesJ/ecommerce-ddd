import UserRepository from './application/repository/user-repository'
import Signin from './application/use-case/signin'
import Signup from './application/use-case/signup'
import Verify from './application/use-case/verify'
import User from './domain/entities/user'
import ExpressAdapter from './infra/http/express-adapter'
import HttpController from './infra/http/http-controller'

const httpServer = new ExpressAdapter()
const users: any = []
const userRepository: UserRepository = {
  async save(user: User): Promise<void> {
    users[user.email.value] = user
  },
  async get(email: string): Promise<User> {
    return users[email]
  },
}
const signup = new Signup(userRepository)
const signin = new Signin(userRepository)
const verify = new Verify()
new HttpController(httpServer, signup, signin, verify)
console.log('listen on 3004')
httpServer.listen(3004)
