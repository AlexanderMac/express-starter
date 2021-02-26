const _ = require('lodash')
const mongoose = require('mongoose')
const sinon = require('sinon')
const nassert = require('n-assert')
const mongoDb = require('../../src/_common/db')
require('../../src/_common/utils/errors')

nassert.initSinon(sinon)

before(async function() {
  // eslint-disable-next-line no-invalid-this
  this.timeout(0)
  await mongoDb.connect()
  await _clearDbs()
})

afterEach(function() {
  // eslint-disable-next-line no-invalid-this
  this.timeout(0)
  return _clearDbs()
})

after(async function() {
  // eslint-disable-next-line no-invalid-this
  this.timeout(0)
  await _clearDbs()
  await mongoDb.disconnect()
})

function _clearDbs() {
  let mongoDel = _(mongoose.models)
    .keys()
    .map(model => mongoose.model(model).deleteMany())
    .value()

  return Promise.all(mongoDel)
}
