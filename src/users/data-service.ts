import { extend } from 'lodash'

import { getObjectOrThrowError, processObjectNotFoundError } from '../common/errors'
import { User } from './model'

export async function getUserOne({ filter, fields }: any) {
  const user = await User.findOne(filter, fields)
  return getObjectOrThrowError(user, 'user')
}

export async function getUserOneOrNull(params: any) {
  try {
    const user = await getUserOne(params)
    return user
  } catch (err: any) {
    return processObjectNotFoundError(err)
  }
}

export function getUsers({ filter, fields }: any) {
  return User.find(filter, fields)
}

export function createUser({ userData }: any) {
  return User.create(userData)
}

export async function findAndUpdateUser({ filter, userData }: any) {
  const user = await getUserOne({ filter })

  extend(user, userData)

  return saveUser({ user })
}

export function saveUser({ user }: any) {
  return user.save()
}

export async function deleteUser(params: any) {
  const user = await getUserOne(params)
  return user.deleteOne()
}
