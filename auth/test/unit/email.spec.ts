import Email from '../../src/domain/entities/email'

describe('Email', () => {
  test('Deve criar um email válido', () => {
    const email = new Email('joao@gmail.com')
    expect(email.value).toBe('joao@gmail.com')
  })

  test('Deve criar um email invalido', () => {
    expect(() => new Email('joao@gmail')).toThrow(new Error('Invalid email'))
  })
})
