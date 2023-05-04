import FreightCalculator from '../../domain/entities/freight-calculator'

export class CalculateFreight {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const output: Output = {
      freight: 0,
    }
    if (input.items) {
      for (const item of input.items) {
        const itemFreight = FreightCalculator.calculate(
          {
            width: item.width,
            height: item.height,
            length: item.length,
            weight: item.weight,
          },

          item.quantity
        )
        output.freight += itemFreight
      }
    }
    return output
  }
}

type Input = {
  items: {
    width: number
    height: number
    length: number
    weight: number
    quantity: number
  }[]
}

type Output = {
  freight: number
}
