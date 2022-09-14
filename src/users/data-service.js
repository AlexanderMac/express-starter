import { extend } from 'lodash-es'
import commonUtil from '../_common/utils/index.js'
import { User } from './model.js'

async function getUserOne({ filter, fields }) {
  let user = await User.findOne(filter, fields)
  return commonUtil.getObjectOrThrowError(user, 'user')
}

async function getUserOneOrNull(params) {
  try {
    let user = await getUserOne(params)
    return user
  } catch (err) {
    return commonUtil.processObjectNotFoundError(err)
  }
}

function getUsers({ filter, fields }) {
  return User.find(filter, fields)
}

function createUser({ userData }) {
  return User.create(userData)
}

async function findAndUpdateUser({ filter, userData }) {
  let user = await getUserOne({ filter })

  extend(user, userData)

  return saveUser({ user })
}

function saveUser({ user }) {
  return user.save()
}

async function deleteUser(params) {
  let user = await getUserOne(params)
  return user.remove()
}

export default {
  getUserOne,
  getUserOneOrNull,
  getUsers,
  createUser,
  findAndUpdateUser,
  saveUser,
  deleteUser
}
