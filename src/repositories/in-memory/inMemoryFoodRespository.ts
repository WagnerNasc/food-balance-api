import { Prisma, Food } from '@prisma/client'
import { FoodRepository } from '../IFoodRepository'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'

export class InMemoryFoodRepository implements FoodRepository {
  private foods: Food[] = []

  async create(data: Prisma.FoodUncheckedCreateInput) {
    const food: Food = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      carb: data.carb ? new Decimal(data.carb.toString()) : null,
      protein: data.protein ? new Decimal(data.protein.toString()) : null,
      fat: data.fat ? new Decimal(data.fat.toString()) : null,
      brandId: data.brandId,
      updatedAt: null,
      createdAt: new Date(),
    }

    this.foods.push(food)

    return food
  }

  async findById(id: string) {
    const food = this.foods.find((food) => food.id === id)

    return food || null
  }
}
