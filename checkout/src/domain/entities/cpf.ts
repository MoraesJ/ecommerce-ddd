export class Cpf {
  private readonly _value: string

  constructor(cpf: string) {
    if (!this.validate(cpf)) {
      throw new Error('Invalid CPF')
    }
    this._value = cpf
  }

  get value() {
    return this._value
  }

  private validate(cpf: string): Boolean {
    cpf = this.clean(cpf)
    this.isValidLenght(cpf)
    if (this.allDigitsAreSame(cpf)) return false
    const digit1 = this.calculateDigit(cpf, 10)
    const digit2 = this.calculateDigit(cpf, 11)
    let nDigVerific = cpf.substring(cpf.length - 2, cpf.length)
    let nDigResult = '' + digit1 + '' + digit2
    return nDigVerific == nDigResult
  }

  private calculateDigit(cpf: string, factor: number) {
    let total = 0
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--
    }
    const rest = total % 11
    return rest < 2 ? 0 : 11 - rest
  }

  private isValidLenght(cpf: string) {
    return cpf.length !== 11
  }

  private clean(cpf: string) {
    return cpf.replace(/\D+/g, '')
  }

  private allDigitsAreSame(cpf: string) {
    return cpf.split('').every((c) => c === cpf[0])
  }
}
