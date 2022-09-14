import { chain } from 'lodash-es'

import AccessDeniedError from './access-denied.js'
import BusinessLogicError from './business-logic.js'
import DuplicateObjectError from './duplicate-object.js'
import ObjectNotFoundError from './object-not-found.js'
import ThirdPartyServiceError from './third-party-service.js'
import UnauthorizedRequestError from './unauthorized-request.js'
import UnprocessableRequestError from './unprocessable-request.js'

const errors = {
  AccessDeniedError,
  BusinessLogicError,
  DuplicateObjectError,
  ObjectNotFoundError,
  ThirdPartyServiceError,
  UnauthorizedRequestError,
  UnprocessableRequestError
}

errors.isKnownError = (err) => {
  const knownErr = chain(errors)
    .keys()
    .without('isKnownError')
    .find(errName => err instanceof errors[errName])
    .value()
  return !!knownErr
}

export default errors
