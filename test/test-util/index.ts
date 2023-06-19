import '../../src/_common/utils/errors'

import mongoose from 'mongoose'
// @ts-ignore
import * as nassert from 'n-assert'
import sinon from 'sinon'

import db from '../../src/_common/db'

nassert.initSinon(sinon)

before(async function () {
  // eslint-disable-next-line no-invalid-this
  this.timeout(0)
  await db.connect()
  await _clearDbs()
})

afterEach(function () {
  // eslint-disable-next-line no-invalid-this
  this.timeout(0)
  return _clearDbs()
})

after(async function () {
  // eslint-disable-next-line no-invalid-this
  this.timeout(0)
  await _clearDbs()
  await db.disconnect()
})

function _clearDbs() {
  const mongoDel = mongoose.modelNames().map(modelName => mongoose.model(modelName).deleteMany())

  return Promise.all(mongoDel)
}
