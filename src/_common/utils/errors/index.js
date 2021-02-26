const _ = require('lodash')

exports.AccessDeniedError = require('./access-denied')
exports.BusinessLogicError = require('./business-logic')
exports.DuplicateObjectError = require('./duplicate-object')
exports.ObjectNotFoundError = require('./object-not-found')
exports.ThirdPartyServiceError = require('./third-party-service')
exports.UnauthorizedRequestError = require('./unauthorized-request')
exports.UnprocessableRequestError = require('./unprocessable-request')

exports.isKnownError = (err) => {
  let knownErr = _.chain(exports)
    .keys()
    .without('isKnownError')
    .find(errName => err instanceof exports[errName])
    .value()
  return !!knownErr
}
