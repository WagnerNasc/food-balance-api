export class CnpjNotIsValidError extends Error {
  constructor() {
    super('Brand already exists with CNPJ.')
  }
}
