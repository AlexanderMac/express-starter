const _ = require('lodash')
const errors = require('./errors')

exports.getObjectOrThrowError = (obj, objType) => {
  if (!obj) {
    let name = _.camelCase(objType || 'object')
    throw new errors.ObjectNotFoundError(`${name} is not found`)
  }
  return obj
}

exports.processObjectNotFoundError = (err) => {
  if (err instanceof errors.ObjectNotFoundError) {
    return null
  }
  throw err
}
