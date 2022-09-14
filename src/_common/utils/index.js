import { camelCase } from 'lodash-es'

import errors from './errors/index.js'

function getObjectOrThrowError(obj, objType) {
  if (!obj) {
    const name = camelCase(objType || 'object')
    throw new errors.ObjectNotFoundError(`${name} is not found`)
  }
  return obj
}

function processObjectNotFoundError(err) {
  if (err instanceof errors.ObjectNotFoundError) {
    return null
  }
  throw err
}

export default {
  getObjectOrThrowError,
  processObjectNotFoundError
}
