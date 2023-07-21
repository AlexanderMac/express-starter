import { NextFunction, Request, Response, Router } from 'express'

import validationMiddleware from '../common/middlewares/validation-middleware'
import * as taskSrvc from './data-service'
import { CreateTaskSchema, GetTaskByIdSchema, UpdateTaskSchema } from './validators'

export const tasksRouter: Router = Router({
  caseSensitive: true,
})

tasksRouter.get('/:taskId', validationMiddleware(GetTaskByIdSchema), getTaskById)
tasksRouter.get('/', getTasks)
tasksRouter.post('/', validationMiddleware(CreateTaskSchema), createTask)
tasksRouter.put('/:taskId', validationMiddleware(UpdateTaskSchema), updateTask)
tasksRouter.delete('/:taskId', validationMiddleware(GetTaskByIdSchema), deleteTask)

export async function getTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const tasks = await taskSrvc.getAllTasks(['name', 'done'])
    res.send(tasks)
  } catch (err) {
    next(err)
  }
}

export async function getTaskById(req: Request, res: Response, next: NextFunction) {
  try {
    const taskId = req.params.taskId
    const task = await taskSrvc.getTaskById(taskId)
    res.send(task)
  } catch (err) {
    next(err)
  }
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const taskData = req.body
    const task = await taskSrvc.createTask(taskData)
    res.status(201).send(task)
  } catch (err) {
    next(err)
  }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const taskId = req.params.taskId
    const taskData = req.body
    await taskSrvc.updateTask(taskId, taskData)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const taskId = req.params.taskId
    await taskSrvc.deleteTaskById(taskId)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
