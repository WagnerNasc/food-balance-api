import { UserRepository } from '@/repositories/IUserRepository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError'
import * as yup from 'yup'
import { YupValidationError } from './errors/yupValidationError'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'MEMBER'
  birthDate: Date
  height?: number | null
  weight?: number | null
}

interface CreateUserUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
    role,
    birthDate,
    height,
    weight,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    try {
      const createUserSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        role: yup.string().oneOf(['ADMIN', 'MEMBER']).required(),
        birthDate: yup.date().required(),
        height: yup.number().nullable(),
        weight: yup.number().nullable(),
      })

      await createUserSchema.validate(
        {
          name,
          email,
          password,
          role,
          birthDate,
          height,
          weight,
        },
        { abortEarly: false },
      )

      const userWithSameEmail = await this.userRepository.findByEmail(email)

      if (userWithSameEmail) {
        throw new UserAlreadyExistsError()
      }

      const user = await this.userRepository.create({
        name,
        email,
        passwordHash: await hash(password, 6),
        role,
        birthDate,
        height,
        weight,
      })

      return {
        user,
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw new YupValidationError(error.errors)
      }

      if (error instanceof UserAlreadyExistsError) {
        throw new UserAlreadyExistsError()
      }

      throw error
    }
  }
}
