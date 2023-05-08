import axios from 'axios'
import AxiosAdapter from '../../src/infra/http/axios-adapter'

test('Deve lancar excecao', async function () {
  const httpClient = new AxiosAdapter()
  expect(() => httpClient.get('http://localhost:3003/getProduct')).rejects.toThrow(
    new Error('Product not found')
  )
})

// test('Deve retornar o produto 1', async function () {
//   const httpClient = new AxiosAdapter()
//   const output = await httpClient.get('http://localhost:3003/products/1')
//   expect(output.idProduct).toBe(1)
//   expect(output.description).toBe('A')
//   expect(output.price).toBe(1000)
//   expect(output.volume).toBe(0.03)
//   expect(output.density).toBe(0.01)
// })

// test('Deve retornar o produto 4', async function () {
//   const httpClient = new AxiosAdapter()
//   expect(() => httpClient.get('http://localhost:3003/products/4')).rejects.toThrow(
//     new Error('Invalid dimension')
//   )
// })
