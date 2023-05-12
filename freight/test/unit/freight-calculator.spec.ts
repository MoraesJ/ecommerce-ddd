import FreightCalculator from '../../src/domain/entities/freight-calculator'

test('Deve calcular o frete do produto de um item com quantidade 1', function () {
  const freight = FreightCalculator.calculate(1000, {
    height: 30,
    length: 10,
    weight: 3,
    width: 100,
  })
  expect(freight).toBe(30)
})

test('Deve calcular o frete do produto com quantidade 3', function () {
  const freight = FreightCalculator.calculate(
    1000,
    {
      height: 30,
      length: 10,
      weight: 3,
      width: 100,
    },
    3
  )
  expect(freight).toBe(90)
})

test('Deve calcular o frete do produto com preço mínimo', function () {
  const freight = FreightCalculator.calculate(1000, {
    height: 10,
    length: 10,
    width: 10,
    weight: 0.9,
  })
  expect(freight).toBe(10)
})
