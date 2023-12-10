import { Brand, Prisma } from '@prisma/client'

export interface BrandRepository {
  create(data: Prisma.BrandCreateInput): Promise<Brand>
  findById(id: string): Promise<Brand | null>
  findByCnpj(cnpj: string): Promise<Brand | null>
}
