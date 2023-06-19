process.env.NODE_ENV = process.env.NODE_ENV || 'development'

import { each, isObject, isArray, isNumber, isBoolean, isUndefined } from 'lodash'
import * as nconf from 'nconf'
import * as path from 'path'

const envConfigFilepath = path.join(__dirname, process.env.NODE_ENV + '.json')
const defConfigFilepath = path.join(__dirname, 'default.json')

nconf
  .env({ separator: '_' })
  .file(envConfigFilepath)
  .file('defaults', defConfigFilepath)

const rootPath = path.normalize(__dirname + '/../../')
nconf.set('env', process.env.NODE_ENV)
nconf.set('rootPath', rootPath)
nconf.set('viewsPath', path.join(rootPath, 'src', 'views'))

function _convertKeysLoLowerCase(obj: Record<string, any>) {
  each(obj, (value, key) => {
    delete obj[key]
    key = key.toLowerCase()
    obj[key] = value

    if (isObject(value) && !isArray(value)) {
      _convertKeysLoLowerCase(value)
    }
  })

  return obj
}

// eslint-disable-next-line max-statements
export function get(key: string) {
  let value = nconf.get(key.toUpperCase())
  if (isUndefined(value)) {
    value = nconf.get(key)
    if (isUndefined(value)) {
      return undefined
    }
  }
  if (isNumber(value) || isBoolean(value) || isArray(value)) {
    return value
  }
  if (isObject(value)) {
    return _convertKeysLoLowerCase(value)
  }
  if (value.match(/^\d$/g)) {
    return parseInt(value)
  }
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }
  return value
}
