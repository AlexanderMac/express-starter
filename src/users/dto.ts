import mongoose from 'mongoose'
import { z } from 'zod'

export const UserIdSchema = z.object({
  userId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), 'Invalid ObjectId'),
})

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

export type UserDto = z.infer<typeof UserSchema>
