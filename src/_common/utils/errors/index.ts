import AccessDeniedError from './access-denied'
import BusinessLogicError from './business-logic'
import DuplicateObjectError from './duplicate-object'
import ObjectNotFoundError from './object-not-found'
import ThirdPartyServiceError from './third-party-service'
import UnauthorizedRequestError from './unauthorized-request'
import UnprocessableRequestError from './unprocessable-request'

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
