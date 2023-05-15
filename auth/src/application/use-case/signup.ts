import User from '../../domain/entities/user'
import UserRepository from '../repository/user-repository'

export default class Signup {
  constructor(readonly userRepository: UserRepository) {}

  async execute({ email, password }: Input): Promise<void> {
    const user = await User.create(email, password)
    await this.userRepository.save(user)
  }
}

type Input = {
  email: string
  password: string
}
