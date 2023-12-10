import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { BrandRepository } from '../IBrandRepository'

export class PrismaBrandRepository implements BrandRepository {
  async create(data: Prisma.BrandCreateInput) {
    const brand = await prisma.brand.create({
      data,
    })

    return brand
  }

  async findById(id: string) {
    const brand = await prisma.brand.findUnique({
      where: {
        id,
      },
    })

    return brand
  }

  async findByCnpj(cnpj: string) {
    const brand = await prisma.brand.findUnique({
      where: {
        cnpj,
      },
    })

    return brand
  }
}
