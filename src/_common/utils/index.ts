import { camelCase } from 'lodash';

import { errors } from './errors';

function getObjectOrThrowError(obj: any, objType: string) {
  if (!obj) {
    const name = camelCase(objType || 'object');
    throw new errors.ObjectNotFoundError(`${name} is not found`);
  }
  return obj;
}

function processObjectNotFoundError(err: Error) {
  if (err instanceof errors.ObjectNotFoundError) {
    return null;
  }
  throw err;
}

export default {
  getObjectOrThrowError,
  processObjectNotFoundError,
};