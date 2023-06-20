import { camelCase } from 'lodash'

import { AccessDeniedError } from './access-denied'
import { BusinessLogicError } from './business-logic'
import { DuplicateObjectError } from './duplicate-object'
import { ObjectNotFoundError } from './object-not-found'
import { ThirdPartyServiceError } from './third-party-service'
import { UnauthorizedRequestError } from './unauthorized-request'
import { UnprocessableRequestError } from './unprocessable-request'

export const errors = {
  AccessDeniedError,
  BusinessLogicError,
  DuplicateObjectError,
  ObjectNotFoundError,
  ThirdPartyServiceError,
  UnauthorizedRequestError,
  UnprocessableRequestError,
}

export function isKnownError(err: Error) {
  return (
    err instanceof AccessDeniedError ||
    err instanceof BusinessLogicError ||
    err instanceof DuplicateObjectError ||
    err instanceof ObjectNotFoundError ||
    err instanceof ThirdPartyServiceError ||
    err instanceof UnauthorizedRequestError ||
    err instanceof UnprocessableRequestError
  )
}

// TODO: why?
export function getObjectOrThrowError(obj: any, objType: string) {
  if (!obj) {
    const name = camelCase(objType || 'object')
    throw new errors.ObjectNotFoundError(`${name} is not found`)
  }
  return obj
}

// TODO: why?
export function processObjectNotFoundError(err: Error) {
  if (err instanceof errors.ObjectNotFoundError) {
    return null
  }
  throw err
}
