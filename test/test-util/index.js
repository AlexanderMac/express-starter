'use strict';

const _         = require('lodash');
const Promise   = require('bluebird');
const mongoose  = require('mongoose');
const mongoDb   = require('../../src/db');
require('../../src/util/errors');
require('../../src/util/promisify');

before(async function() {
  this.timeout(0);
  await mongoDb.connect();
  await _clearDbs();
});

afterEach(function() {
  this.timeout(0);
  return _clearDbs();
});

after(async function() {
  this.timeout(0);
  await _clearDbs();
  await mongoDb.disconnect();
});

function _clearDbs() {
  let mongoDel = _(mongoose.models)
    .keys()
    .map(model => mongoose.model(model).deleteMany())
    .value();

  return Promise.all(mongoDel);
}
