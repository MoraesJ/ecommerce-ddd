import Zipcode from '../../domain/entities/zipcode'

export default interface ZipcodeRepository {
  get(code: string): Promise<Zipcode | undefined>
}
