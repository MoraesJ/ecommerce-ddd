import { CouponRepository } from '../../application/repository/coupon-repository'
import { Coupon } from '../../domain/entities/coupon'

export class InMemoryCouponRepository implements CouponRepository {
  private coupons: Coupon[] = []

  async getCoupon(code: string): Promise<Coupon> {
    const coupon = this.coupons.find((coupon) => coupon.code === code)
    if (!coupon) {
      throw new Error('Coupon not found')
    }
    return coupon
  }
}
