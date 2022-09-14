import mongoose from 'mongoose'
import sinon from 'sinon'
import nassert from 'n-assert'

import mongoDb from '../../src/_common/db/index.js'
import '../../src/_common/utils/errors/index.js'

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
  const mongoDel = mongoose.modelNames().map(modelName => mongoose.model(modelName).deleteMany())

  return Promise.all(mongoDel)
}
