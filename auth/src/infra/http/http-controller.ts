import Signin from '../../application/use-case/signin'
import Signup from '../../application/use-case/signup'
import Verify from '../../application/use-case/verify'
import HttpServer from './http-server'

export default class HttpController {
  constructor(
    readonly httpServer: HttpServer,
    readonly signup: Signup,
    readonly signin: Signin,
    readonly verify: Verify
  ) {
    httpServer.on('post', '/signup', async function (params: any, body: any) {
      const output = await signup.execute(body)
      return output
    })

    httpServer.on('post', '/signin', async function (params: any, body: any) {
      if (typeof body.date === 'string') {
        body.date = new Date(body.date)
      }

      const output = await signin.execute(body)
      return output
    })

    httpServer.on('post', '/verify', async function (params: any, body: any) {
      const output = await verify.execute(body.token)
      return output
    })
  }
}
