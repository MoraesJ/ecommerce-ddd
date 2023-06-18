export default interface FreightGateway {
  calculateFreight(input: FreightGatewayInput): Promise<FreightGatewayOutput>
}

export type FreightGatewayInput = {
  items: {
    width: number
    height: number
    length: number
    weight: number
    quantity: number
  }[]
  from?: string
  to?: string
}

type FreightGatewayOutput = {
  freight: number
}
