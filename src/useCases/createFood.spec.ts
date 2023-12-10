import { expect, it, beforeEach, describe } from '@jest/globals'
import { CreateFoodUseCase } from './createFood'
import { InMemoryFoodRepository } from '@/repositories/in-memory/inMemoryFoodRespository'
import { InMemoryBrandRepository } from '@/repositories/in-memory/inMemoryBrandRespository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

let foodRepository: InMemoryFoodRepository
let brandRepository: InMemoryBrandRepository
let sut: CreateFoodUseCase

describe('Create Food', () => {
  beforeEach(() => {
    foodRepository = new InMemoryFoodRepository()
    brandRepository = new InMemoryBrandRepository()
    sut = new CreateFoodUseCase(foodRepository, brandRepository)
  })
  it('should be able to create food', async () => {
    const { id } = await brandRepository.create({
      name: 'Nestle',
      cnpj: '05.178.800/0001-10',
    })

    const { food } = await sut.execute({
      name: 'Rice',
      description: 'Rice grain',
      carb: 100,
      protein: 2.2,
      fat: 0,
      brandId: id,
    })

    expect(food).toHaveProperty('id')
  })

  it('should not be able to create food without brand', async () => {
    await expect(() =>
      sut.execute({
        name: 'Rice',
        description: 'Rice grain',
        carb: 100,
        protein: 2.2,
        fat: 0,
        brandId: 'brand-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
