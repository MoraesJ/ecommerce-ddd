import User from '../../src/domain/entities/user'

test('Deve criar um novo usuario', async () => {
  const user = await User.create('teste@email.com', 'test')
  const isValidPassword = await user.validatePassword('test')
  expect(isValidPassword).toBeTruthy()
})

test('Deve criar um usuario a partir do banco de dados', async () => {
  const user = User.buildExistingUser(
    'teste@email.com',
    '9a4c08c66aab9ff1f08809e6d59e61b8aff62bbfa5958b024c6ab8d5b39a96a29e8d21894fdf49d3be2805b409cea1085dca228039739c6d36917973ff8d69b1',
    'salt'
  )
})
