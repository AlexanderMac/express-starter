process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const _ = require('lodash');
const nconf = require('nconf');
const path = require('path');

const envConfigFilepath = path.join(__dirname, process.env.NODE_ENV + '.json');
const defConfigFilepath = path.join(__dirname, 'default.json');

nconf
  .env({ separator: '_' })
  .file(envConfigFilepath)
  .file('defaults', defConfigFilepath);

const rootPath = path.normalize(__dirname + '/../../');
nconf.set('env', process.env.NODE_ENV);
nconf.set('rootPath', rootPath);
nconf.set('viewsPath', path.join(rootPath, 'src', 'views'));

function _convertKeysLoLowerCase(obj) {
  _.each(obj, (value, key) => {
    delete obj[key];
    key = key.toLowerCase();
    obj[key] = value;

    if (_.isObject(value) && !_.isArray(value)) {
      _convertKeysLoLowerCase(value);
    }
  });

  return obj;
}

// eslint-disable-next-line max-statements
function get(key) {
  let value = nconf.get(key.toUpperCase());
  if (_.isUndefined(value)) {
    value = nconf.get(key);
    if (_.isUndefined(value)) {
      return undefined;
    }
  }
  if (_.isNumber(value) || _.isBoolean(value) || _.isArray(value)) {
    return value;
  }
  if (_.isObject(value)) {
    return _convertKeysLoLowerCase(value);
  }
  if (value.match(/^\d$/g)) {
    return parseInt(value);
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return value;
}

exports.get = get;
