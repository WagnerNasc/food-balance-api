export class BrandAlreadyExistsError extends Error {
  constructor() {
    super('Brand already exists with CNPJ.')
  }
}
