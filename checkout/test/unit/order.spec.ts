import { Coupon } from '../src/domain/entities/coupon'
import { Cpf } from '../src/domain/entities/cpf'
import { Item } from '../src/domain/entities/item'
import { Order } from '../src/domain/entities/order'
import { OrderItem } from '../src/domain/entities/order-item'

test('Should create an empty order', () => {
  const cpf = new Cpf('95057772058')
  const order = new Order(cpf, new Date())
  expect(order.total).toBe(0)
})

test('Should create an order with 1 item', () => {
  const cpf = new Cpf('95057772058')
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
  const orderItem = new OrderItem(item, 1)
  const order = new Order(cpf, new Date())
  order.addItem(orderItem)
  expect(order.total).toBe(1000)
})

test('Should create an order with 3 items', () => {
  const cpf = new Cpf('95057772058')
  const [item1, item2] = [
    new OrderItem(
      new Item(
        'c49e58d3-c9ff-4e91-a0da-979ac43891e6',
        'cellphone',
        1000,
        10,
        10,
        10,
        9,
        'BRL'
      ),
      1
    ),
    new OrderItem(
      new Item(
        '9e5098c3-0445-4eeb-9c06-6b02141d1a09',
        'fridge',
        1500,
        10,
        10,
        10,
        9,
        'BRL'
      ),
      2
    ),
  ]
  const order = new Order(cpf, new Date())
  order.addItem(item1)
  order.addItem(item2)
  expect(order.total).toBe(4000)
})

test('Should create an order with a unexpired discount coupon', () => {
  const item = new Item(
    'c49e58d3-c9ff-4e91-a0da-979ac43891e6',
    'brush',
    5,
    10,
    10,
    10,
    9,
    'BRL'
  )
  const orderItem = new OrderItem(item, 2)
  const cpf = new Cpf('95057772058')
  const coupon = new Coupon('TEST', 0.5, new Date('2023-10-01T10:00:00'))
  const order = new Order(cpf, new Date())
  order.addItem(orderItem)
  order.addCoupon(coupon)
  expect(order.total).toEqual(5)
})

test('Should create an order with a expired discount coupon', () => {
  const item = new Item(
    'c49e58d3-c9ff-4e91-a0da-979ac43891e6',
    'brush',
    5,
    10,
    10,
    10,
    9,
    'BRL'
  )
  const orderItem = new OrderItem(item, 2)
  const cpf = new Cpf('95057772058')
  const coupon = new Coupon('TEST', 0.5, new Date('2022-10-01T10:00:00'))
  const order = new Order(cpf, new Date())
  order.addItem(orderItem)
  order.addCoupon(coupon)
  expect(order.total).toEqual(10)
})

test('Should throw exception when the same item is added', () => {
  const cpf = new Cpf('95057772058')
  const [item1, item2] = [
    new OrderItem(
      new Item(
        'c49e58d3-c9ff-4e91-a0da-979ac43891e6',
        'cellphone',
        1000,
        10,
        10,
        10,
        9,
        'BRL'
      ),
      1
    ),
    new OrderItem(
      new Item(
        'c49e58d3-c9ff-4e91-a0da-979ac43891e6',
        'fridge',
        1000,
        10,
        10,
        10,
        9,
        'BRL'
      ),
      1
    ),
  ]
  const order = new Order(cpf, new Date())
  order.addItem(item1)
  expect(() => order.addItem(item2)).toThrow(new Error('Already has this item'))
})
