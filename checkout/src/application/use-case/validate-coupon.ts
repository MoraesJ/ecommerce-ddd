import { CouponRepository } from '../coupon-repository'
import { InMemoryCouponRepository } from '../in-memory-coupon-repository'

export class ValidateCoupon {
  constructor(
    private couponRepository: CouponRepository = new InMemoryCouponRepository()
  ) {}
  async execute(code: string): Promise<Boolean> {
    const coupon = await this.couponRepository.getCoupon(code)
    return coupon.isExpired(new Date())
  }
}
