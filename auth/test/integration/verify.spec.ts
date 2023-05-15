import Verify from '../../src/application/use-case/verify'

test('Deve verificar um token', async () => {
  const verify = new Verify()
  const payload = await verify.execute(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImlhdCI6MTY4Mjk0NjAwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ._jMOU31L_2Q2Z6aZolqAAKT6OUH2Si8DavZ5IB4eDoQ'
  )
  expect(payload.email).toBe('teste@email.com')
})
