import UserRepository from '../../src/application/repository/user-repository'
import Signin from '../../src/application/use-case/signin'
import Signup from '../../src/application/use-case/signup'
import User from '../../src/domain/entities/user'

test('Deve criar uma conta para o usuario', async () => {
  const users: any = {}
  const userRepository: UserRepository = {
    async save(user: User): Promise<void> {
      users[user.email.value] = user
    },
    async get(email: string): Promise<User> {
      return users[email]
    },
  }
  const signup = new Signup(userRepository)
  const input = {
    email: 'teste@email.com',
    password: 'test',
    date: new Date('2023-05-01T10:00:00'),
  }
  await signup.execute(input)
  const login = new Signin(userRepository)
  const output = await login.execute(input)
  expect(output.token).toBe(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImlhdCI6MTY4Mjk0NjAwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ._jMOU31L_2Q2Z6aZolqAAKT6OUH2Si8DavZ5IB4eDoQ'
  )
})
