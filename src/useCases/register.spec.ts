import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { expect, it, beforeEach, describe } from '@jest/globals'
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError'
import { InMemoryUserRepository } from '@/repositories/in-memory/inMemoryUserRespository'

let userRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Register User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(userRepository)
  })
  it('should be able to create user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
      role: 'ADMIN',
      birthDate: new Date('1995-10-26'),
      height: 1.78,
      weight: 76,
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create user with same email', async () => {
    const email = 'johndoe@test.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      role: 'ADMIN',
      birthDate: new Date('1995-10-26'),
      height: 1.78,
      weight: 76,
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        role: 'ADMIN',
        birthDate: new Date('1995-10-26'),
        height: 1.78,
        weight: 76,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to validate hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
      role: 'ADMIN',
      birthDate: new Date('1995-10-26'),
      height: 1.78,
      weight: 76,
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
