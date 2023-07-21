import { NextFunction, Request, Response, Router } from 'express'

import validationMiddleware from '../common/middlewares/validation-middleware'
import * as userSrvc from './data-service'
import { CreateUserSchema, GetUserByIdSchema, UpdateUserSchema } from './validators'

export const usersRouter: Router = Router({
  caseSensitive: true,
})

usersRouter.get('/:userId', validationMiddleware(GetUserByIdSchema), getUserById)
usersRouter.get('/', getUsers)
usersRouter.post('/', validationMiddleware(CreateUserSchema), createUser)
usersRouter.put('/:userId', validationMiddleware(UpdateUserSchema), updateUser)
usersRouter.delete('/:userId', validationMiddleware(GetUserByIdSchema), deleteUser)

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userSrvc.getAllUsers(['name', 'email'])
    res.send(users)
  } catch (err) {
    next(err)
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.userId
    const user = await userSrvc.getUserById(userId)
    res.send(user)
  } catch (err) {
    next(err)
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userData = req.body
    const user = await userSrvc.createUser(userData)
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.userId
    const userData = req.body
    await userSrvc.updateUser(userId, userData)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.userId
    await userSrvc.deleteUserById(userId)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
