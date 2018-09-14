'use strict';

const _            = require('lodash');
const customErrors = require('n-custom-errors');

exports.getObjectOrThrowError = (obj, objType) => {
  if (!obj) {
    let name = _.camelCase(objType || 'object');
    throw customErrors.getObjectNotFoundError(`${name} is not found`);
  }
  return obj;
};

exports.processObjectNotFoundError = (err) => {
  if (customErrors.isObjectNotFoundError(err)) {
    return null;
  }
  throw err;
};
