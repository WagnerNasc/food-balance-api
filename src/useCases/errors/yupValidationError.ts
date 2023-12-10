export class YupValidationError {
  errors: string[]

  constructor(errors: string[]) {
    this.errors = errors
  }
}
