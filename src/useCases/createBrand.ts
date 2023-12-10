import { Brand } from '@prisma/client'
import { BrandRepository } from '@/repositories/IBrandRepository'
import { BrandAlreadyExistsError } from './errors/brandAlreadyExistsError'
import { CnpjNotIsValidError } from './errors/cnpjNotIsValidError'
import { validarCnpj } from '@/utils/validateCnpj'

interface CreateBrandUseCaseRequest {
  name: string
  cnpj: string
}

interface CreateBrandUseCaseResponse {
  brand: Brand
}

export class CreateBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute({
    name,
    cnpj,
  }: CreateBrandUseCaseRequest): Promise<CreateBrandUseCaseResponse> {
    try {
      const cnpjIsValid = validarCnpj(cnpj)

      if (!cnpjIsValid) {
        throw new CnpjNotIsValidError()
      }
      const brandAlreadyExists = await this.brandRepository.findByCnpj(cnpj)

      if (brandAlreadyExists) {
        throw new BrandAlreadyExistsError()
      }
      const brand = await this.brandRepository.create({
        name,
        cnpj,
      })

      return {
        brand,
      }
    } catch (error) {
      if (error instanceof BrandAlreadyExistsError) {
        throw new BrandAlreadyExistsError()
      }

      if (error instanceof CnpjNotIsValidError) {
        throw new CnpjNotIsValidError()
      }

      throw error
    }
  }
}
