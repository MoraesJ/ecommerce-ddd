import { Item } from '../src/domain/entities/item'

test('Should create a valid item', () => {
  const item = new Item(
    'c49e58d3-c9ff-4e91-a0da-979ac43891e6',
    'cellphone',
    1000,
    10,
    10,
    10,
    9,
    'BRL'
  )
  expect(item.description).toEqual('cellphone')
  expect(item.price).toEqual(1000)
})

test('Should throw a price exception', () => {
  expect(
    () =>
      new Item(
        'c49e58d3-c9ff-4e91-a0da-979ac43891e6',
        'cellphone',
        0,
        10,
        10,
        10,
        9,
        'BRL'
      )
  ).toThrow(new Error('Invalid price'))
})

test('Should throw a description exception', () => {
  expect(
    () => new Item('c49e58d3-c9ff-4e91-a0da-979ac43891e6', '', 1000, 10, 10, 10, 9, 'BRL')
  ).toThrow(new Error('Invalid description'))
})
