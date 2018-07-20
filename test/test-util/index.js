'use strict';

const _        = require('lodash');
const mongoose = require('mongoose');
const db       = require('../../server/db');
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
  let ops = _(mongoose.models)
    .keys()
    .map(modelName => mongoose.model(modelName).remove())
    .value();

  return Promise.all(ops);
}
