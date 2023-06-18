import { Coupon } from '../../src/domain/entities/coupon'

test.each([
  { code: '30OFF', discount: 0.05, expireDate: new Date('2023-10-01T10:00:00') },
  { code: 'TEST', discount: 0.3, expireDate: new Date('2023-10-01T10:00:00') },
  { code: 'ABC', discount: 1, expireDate: new Date('2023-10-01T10:00:00') },
])('Should create a valid coupon', (validCoupon) => {
  const { code, discount, expireDate } = validCoupon
  const coupon = new Coupon(code, discount, expireDate)
  expect(coupon).toBeInstanceOf(Coupon)
  expect(coupon.code).toEqual(code)
  expect(coupon.isExpired(new Date('2023-09-01T10:00:00'))).toBeFalsy()
})

test.each([
  { code: 'FF', discount: 0.05, expireDate: new Date('2023-10-01T10:00:00') },
  { code: '', discount: 0.05, expireDate: new Date('2023-10-01T10:00:00') },
])('Should throw a invalid code exception', (invalidCoupon) => {
  const { code, discount, expireDate } = invalidCoupon
  expect(() => new Coupon(code, discount, expireDate)).toThrow(
    new Error('Invalid coupon code')
  )
})

test.each([
  { code: 'FFF', discount: -0.05, expireDate: new Date('2023-10-01T10:00:00') },
  { code: 'TEST', discount: -100, expireDate: new Date('2023-10-01T10:00:00') },
])('Should throw a invalid discount value exception', (invalidCoupon) => {
  const { code, discount, expireDate } = invalidCoupon
  expect(() => new Coupon(code, discount, expireDate)).toThrow(
    new Error('Invalid discount value')
  )
})

test('Should create a expirate coupon', () => {
  const today = new Date('2023-10-01T10:00:00')
  const expireDate = new Date('2023-09-01T10:00:00')
  const coupon = new Coupon('CODE', 0.3, expireDate)
  expect(coupon.isExpired(today)).toBeTruthy()
})
