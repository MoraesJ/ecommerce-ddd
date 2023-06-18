import { Item } from '../src/domain/entities/item'
import { OrderItem } from '../src/domain/entities/order-item'

test('Should create a valid orderItem', () => {
  const item = new Item(
    'c49e58d3-c9ff-4e91-a0da-979ac43891e6',
    'fridge',
    1250.9,
    10,
    10,
    10,
    9,
    'BRL'
  )
  const orderItem = new OrderItem(item, 1)
  expect(orderItem.quantity).toEqual(1)
  expect(orderItem.total).toEqual(1250.9)
})

test('Should create a valid orderItem', () => {
  const item = new Item(
    'c49e58d3-c9ff-4e91-a0da-979ac43891e6',
    'fridge',
    1100,
    10,
    10,
    10,
    9,
    'BRL'
  )
  const orderItem = new OrderItem(item, 3)
  expect(orderItem.quantity).toEqual(3)
  expect(orderItem.total).toEqual(3300)
})

test('Should throw a exception when quantity is invalid', () => {
  const item = new Item(
    'c49e58d3-c9ff-4e91-a0da-979ac43891e6',
    'fridge',
    1100,
    10,
    10,
    10,
    9,
    'BRL'
  )
  expect(() => {
    new OrderItem(item, -1)
  }).toThrow(new Error('Invalid quantity'))
})
