import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../IUserRepository'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role,
      birthDate: new Date(data.birthDate),
      height: data.height ? new Prisma.Decimal(data?.height.toString()) : null,
      weight: data.weight ? new Prisma.Decimal(data.weight.toString()) : null,
      updatedAt: null,
      createdAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)

    return user || null
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    return user || null
  }
}
