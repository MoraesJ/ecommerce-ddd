import TokenGenerator from '../../src/domain/entities/token-generator'
import User from '../../src/domain/entities/user'

test('Deve gerar o token do usuario', async () => {
  const user = await User.create('teste@email.com', 'test')
  const expiresIn = 1000000
  const issueDate = new Date('2023-05-01T10:00:00')
  const tokenGenerator = new TokenGenerator('key')
  const token = tokenGenerator.generate(user, expiresIn, issueDate)
  expect(token).toBe(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImlhdCI6MTY4Mjk0NjAwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ._jMOU31L_2Q2Z6aZolqAAKT6OUH2Si8DavZ5IB4eDoQ'
  )
})

test('Deve validar o token do usuario', async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImlhdCI6MTY4Mjk0NjAwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ._jMOU31L_2Q2Z6aZolqAAKT6OUH2Si8DavZ5IB4eDoQ'
  const tokenGenerator = new TokenGenerator('key')
  const payload = tokenGenerator.verify(token)
  expect(payload).toBeDefined()
  expect(payload.email).toBe('teste@email.com')
})

test('Deve tentar validar o token invalido', async () => {
  const token =
    'eyJhbGciOiJIUsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImlhdCI6MTY4Mjk0NjAwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ._jMOU31L_2Q2Z6aZolqAAKT6OUH2Si8DavZ5IB4eDoQ'
  const tokenGenerator = new TokenGenerator('key')
  expect(() => tokenGenerator.verify(token)).toThrow(new Error('invalid token'))
})
