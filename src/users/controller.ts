import { NextFunction, Request, Response, Router } from 'express'

import * as userSrvc from './data-service'
import { getSingleFilter, parseUserParams } from './helpers'

export const usersRouter: Router = Router({
  caseSensitive: true,
})

usersRouter.get('/:userId', getUserById)
usersRouter.get('/', getUsers)
usersRouter.post('/', createUser)
usersRouter.put('/:userId', updateUser)
usersRouter.delete('/:userId', deleteUser)

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userSrvc.getUsers({
      filter: {},
      fields: 'name email',
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userSrvc.getUserOne({
      filter: getSingleFilter(req.params),
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userSrvc.createUser({
      userData: parseUserParams(req.body),
    })
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    await userSrvc.findAndUpdateUser({
      filter: getSingleFilter(req.params),
      userData: parseUserParams(req.body),
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    await userSrvc.deleteUser({
      filter: getSingleFilter(req.params),
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
