import { Brand, Prisma } from '@prisma/client'
import { BrandRepository } from '../IBrandRepository'
import { randomUUID } from 'crypto'

export class InMemoryBrandRepository implements BrandRepository {
  private brands: Brand[] = []

  async create(data: Prisma.BrandCreateInput) {
    const brand: Brand = {
      id: randomUUID(),
      name: data.name,
      cnpj: data.cnpj,
      updatedAt: null,
      createdAt: new Date(),
    }

    this.brands.push(brand)

    return brand
  }

  async findById(id: string) {
    const brand = this.brands.find((brand) => brand.id === id)

    return brand || null
  }

  async findByCnpj(cnpj: string) {
    const brand = this.brands.find((brand) => brand.cnpj === cnpj)

    return brand || null
  }
}
