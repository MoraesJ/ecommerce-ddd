import User from '../../domain/entities/user'

export default interface UserRepository {
  save(user: User): Promise<void>
  get(email: string): Promise<User>
}
