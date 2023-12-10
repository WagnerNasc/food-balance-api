import { Food, Prisma } from '@prisma/client'

export interface FoodRepository {
  create(data: Prisma.FoodUncheckedCreateInput): Promise<Food>
  findById(id: string): Promise<Food | null>
}
