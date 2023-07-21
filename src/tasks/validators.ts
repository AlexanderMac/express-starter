import { z } from 'zod'

import { TaskIdSchema, TaskSchema } from './dto'

export const GetTaskByIdSchema = z.object({
  params: TaskIdSchema.pick({ taskId: true }).strict(),
})

export const CreateTaskSchema = z.object({
  body: TaskSchema.strict(),
})

export const UpdateTaskSchema = z.object({
  params: TaskIdSchema.pick({ taskId: true }).strict(),
  body: TaskSchema.pick({ name: true, done: true }).strict(),
})
