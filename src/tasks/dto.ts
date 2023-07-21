import mongoose from 'mongoose'
import { z } from 'zod'

export const TaskIdSchema = z.object({
  taskId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), 'Invalid ObjectId'),
})

export const TaskSchema = z.object({
  name: z.string(),
  done: z.boolean(),
})

export type TaskDto = z.infer<typeof TaskSchema>
