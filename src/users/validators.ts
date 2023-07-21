import { z } from 'zod'

import { UserIdSchema, UserSchema } from './dto'

export const GetUserByIdSchema = z.object({
  params: UserIdSchema.pick({ userId: true }).strict(),
})

export const CreateUserSchema = z.object({
  body: UserSchema.strict(),
})

export const UpdateUserSchema = z.object({
  params: UserIdSchema.pick({ userId: true }).strict(),
  body: UserSchema.pick({ name: true, email: true }).strict(),
})
