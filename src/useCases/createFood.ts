import { Food } from '@prisma/client'
import { FoodRepository } from '@/repositories/IFoodRepository'
import { BrandRepository } from '@/repositories/IBrandRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface CreateFoodUseCaseRequest {
  name: string
  description: string
  carb: number
  protein: number
  fat: number
  brandId: string
}

interface CreateFoodUseCaseResponse {
  food: Food
}

export class CreateFoodUseCase {
  constructor(
    private foodRepository: FoodRepository,
    private brandRepository: BrandRepository,
  ) {}

  async execute({
    name,
    description,
    carb,
    protein,
    fat,
    brandId,
  }: CreateFoodUseCaseRequest): Promise<CreateFoodUseCaseResponse> {
    try {
      const brand = await this.brandRepository.findById(brandId)

      if (!brand) {
        throw new ResourceNotFoundError()
      }

      const food = await this.foodRepository.create({
        name,
        description,
        carb,
        protein,
        fat,
        brandId,
      })

      return {
        food,
      }
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw new ResourceNotFoundError()
      }

      throw error
    }
  }
}
