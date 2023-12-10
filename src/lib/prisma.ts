// import envSchema from '@/env'
import { PrismaClient } from '@prisma/client'
import { env } from '@/env'

// console.log(envSchema)
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
