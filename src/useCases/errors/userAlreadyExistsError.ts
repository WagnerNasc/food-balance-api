export class UserAlreadyExistsError extends Error {
  constructor() {
    super()
    this.message = 'Email already exists.'
  }
}
