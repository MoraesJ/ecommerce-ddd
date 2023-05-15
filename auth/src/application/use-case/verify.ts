import TokenGenerator from '../../domain/entities/token-generator'
import User from '../../domain/entities/user'
import UserRepository from '../repository/user-repository'

export default class Verify {
  constructor() {}

  async execute(token: string): Promise<any> {
    const tokenGenerator = new TokenGenerator('key')
    return tokenGenerator.verify(token)
  }
}
