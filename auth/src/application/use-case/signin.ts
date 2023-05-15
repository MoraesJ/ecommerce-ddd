import TokenGenerator from '../../domain/entities/token-generator'
import UserRepository from '../repository/user-repository'

export default class Signin {
  constructor(readonly userRepository: UserRepository) {}

  async execute({ email, password, date }: Input): Promise<Ouput> {
    const user = await this.userRepository.get(email)
    if (!user) throw new Error('user not found')
    const isValidPassword = await user.validatePassword(password)
    if (!isValidPassword) throw new Error('invalid password')
    const tokenGenerator = new TokenGenerator('key')
    const token = tokenGenerator.generate(user, 1000000, date)
    return {
      token,
    }
  }
}

type Input = {
  email: string
  password: string
  date: Date
}

type Ouput = {
  token: string
}
