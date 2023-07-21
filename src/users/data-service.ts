import { extend } from 'lodash'

import { ObjectNotFoundError } from '../common/errors/object-not-found'
import { UserDto } from './dto'
import { User } from './model'

export async function getUserById(userId: string, fields?: string[]) {
  const user = await User.findOne({ _id: userId }, fields)
  if (user) {
    return user
  }
  throw new ObjectNotFoundError('User not found')
}

export function getAllUsers(fields?: string[]) {
  return User.find({}, fields)
}

export function createUser(userData: UserDto) {
  return User.create(userData)
}

export async function updateUser(userId: string, userData: UserDto) {
  const user = await getUserById(userId)
  extend(user, userData)

  return user.save()
}

export async function deleteUserById(userId: string) {
  const user = await getUserById(userId)
  return user.deleteOne()
}
