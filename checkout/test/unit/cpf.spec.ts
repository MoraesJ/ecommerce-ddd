import { Cpf } from '../src/domain/entities/cpf'

test.each(['875.572.340-30', '540.982.600-00', '937.391.040-07'])(
  'Should create a valid CPF',
  (cpf) => {
    const isValid = new Cpf(cpf)
    expect(isValid.value).toEqual(cpf)
  }
)

test('Should throw a invalid CPF exception', () => {
  expect(() => {
    new Cpf('875.572.340-31')
  }).toThrow(new Error('Invalid CPF'))
})

test('Should throw a invalid CPF exception when all digits are the same', () => {
  expect(() => {
    new Cpf('222.222.222-22')
  }).toThrow(new Error('Invalid CPF'))
})
