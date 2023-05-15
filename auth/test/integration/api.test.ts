import axios from 'axios'

test('Deve validar o fluxo de autenticacao', async () => {
  const input = {
    email: 'teste@email.com',
    password: 'test',
    date: new Date('2023-05-01T10:00:00'),
  }
  await axios.post('http://localhost:3004/signup', input)
  const response = await axios.post('http://localhost:3004/signin', input)
  const output = response.data
  expect(output.token).toBe(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImlhdCI6MTY4Mjk0NjAwMDAwMCwiZXhwaXJlc0luIjoxMDAwMDAwfQ._jMOU31L_2Q2Z6aZolqAAKT6OUH2Si8DavZ5IB4eDoQ'
  )
})
