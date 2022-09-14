import userHelpers from './helpers.js'
import usersSrvc from './data-service.js'

async function getUsers(req, res, next) {
  try {
    const users = await usersSrvc.getUsers({
      filter: {},
      fields: 'name email'
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await usersSrvc.getUserOne({
      filter: userHelpers.getSingleFilter(req.params)
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
}

async function createUser(req, res, next) {
  try {
    const user = await usersSrvc.createUser({
      userData: userHelpers.parseUserParams(req.body)
    })
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

async function updateUser(req, res, next) {
  try {
    await usersSrvc.findAndUpdateUser({
      filter: userHelpers.getSingleFilter(req.params),
      userData: userHelpers.parseUserParams(req.body)
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

async function deleteUser(req, res, next) {
  try {
    await usersSrvc.deleteUser({
      filter: userHelpers.getSingleFilter(req.params)
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
