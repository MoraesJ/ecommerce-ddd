export interface DimensionsInput {
  width: number
  height: number
  length: number
  weight: number
}

export default class FreightCalculator {
  static calculate(
    distance: number,
    dimensionsInput: DimensionsInput,
    quantity: number = 1
  ) {
    const { width, height, length, weight } = dimensionsInput
    const volume = (width / 100) * (height / 100) * (length / 100)
    const density = weight / volume
    const itemFreight = distance * volume * (density / 100)
    return Math.max(itemFreight, 10) * quantity
  }
}
