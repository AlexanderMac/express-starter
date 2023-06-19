import { NextFunction, Request, Response } from 'express'

import usersSrvc from './data-service'
import userHelpers from './helpers'

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await usersSrvc.getUsers({
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
    const user = await usersSrvc.getUserOne({
      filter: userHelpers.getSingleFilter(req.params),
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersSrvc.createUser({
      userData: userHelpers.parseUserParams(req.body),
    })
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    await usersSrvc.findAndUpdateUser({
      filter: userHelpers.getSingleFilter(req.params),
      userData: userHelpers.parseUserParams(req.body),
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    await usersSrvc.deleteUser({
      filter: userHelpers.getSingleFilter(req.params),
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
