'use strict';

var _        = require('lodash');
var Promise  = require('bluebird');
var mongoose = require('mongoose');
var db       = require('../../server/db');
require('sinon-as-promised')(Promise);
require('../../server/util/errors');

before(done => {
  db
    .connect()
    .then(_clearDb)
    .then(() => done())
    .catch(done);
});

afterEach(done => {
  _clearDb()
    .then(() => done())
    .catch(done);
});

after(done => {
  _clearDb()
    .then(db.disconnect)
   .then(() => done())
    .catch(done);
});

function _clearDb() {
  var ops = _(mongoose.models)
    .keys()
    .map(modelName => mongoose.model(modelName).remove())
    .value();

  return Promise.all(ops);
}
