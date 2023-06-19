import { extend } from 'lodash'

import commonUtil from '../_common/utils'
import { User } from './model'

async function getUserOne({ filter, fields }: any) {
  const user = await User.findOne(filter, fields)
  return commonUtil.getObjectOrThrowError(user, 'user')
}

async function getUserOneOrNull(params: any) {
  try {
    const user = await getUserOne(params)
    return user
  } catch (err: any) {
    return commonUtil.processObjectNotFoundError(err)
  }
}

function getUsers({ filter, fields }: any) {
  return User.find(filter, fields)
}

function createUser({ userData }: any) {
  return User.create(userData)
}

async function findAndUpdateUser({ filter, userData }: any) {
  const user = await getUserOne({ filter })

  extend(user, userData)

  return saveUser({ user })
}

function saveUser({ user }: any) {
  return user.save()
}

async function deleteUser(params: any) {
  const user = await getUserOne(params)
  return user.deleteOne()
}

export default {
  getUserOne,
  getUserOneOrNull,
  getUsers,
  createUser,
  findAndUpdateUser,
  saveUser,
  deleteUser,
}
