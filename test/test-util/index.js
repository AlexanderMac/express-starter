'use strict';

const _         = require('lodash');
const Promise   = require('bluebird');
const mongoose  = require('mongoose');
const mongoDb   = require('../../server/db');
require('../../server/util/errors');
require('../../server/util/promisify');

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
    .map(model => mongoose.model(model).remove())
    .value();

  return Promise.all(mongoDel);
}
