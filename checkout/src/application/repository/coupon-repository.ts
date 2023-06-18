import { Coupon } from './domain/entities/coupon'

export interface CouponRepository {
  getCoupon(code: string): Promise<Coupon>
}
