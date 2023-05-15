import Password from '../../src/domain/entities/password'

describe('Password', () => {
  test('Deve criar uma senha', async () => {
    const password = await Password.create('test', 'salt')
    expect(password.value).toBe(
      '9a4c08c66aab9ff1f08809e6d59e61b8aff62bbfa5958b024c6ab8d5b39a96a29e8d21894fdf49d3be2805b409cea1085dca228039739c6d36917973ff8d69b1'
    )
  })

  test('Deve validar uma senha', async () => {
    const password = new Password(
      '9a4c08c66aab9ff1f08809e6d59e61b8aff62bbfa5958b024c6ab8d5b39a96a29e8d21894fdf49d3be2805b409cea1085dca228039739c6d36917973ff8d69b1',
      'salt'
    )
    const isValid = await password.validate('test')
    expect(isValid).toBeTruthy()
  })
})
