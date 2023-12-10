import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FoodRepository } from '../IFoodRepository'

export class PrismaFoodRepository implements FoodRepository {
  async create(data: Prisma.FoodUncheckedCreateInput) {
    const food = await prisma.food.create({
      data,
    })

    return food
  }

  async findById(id: string) {
    const food = await prisma.food.findUnique({
      where: {
        id,
      },
    })

    return food
  }
}
