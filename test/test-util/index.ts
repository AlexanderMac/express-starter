import '../../env'

import mongoose from 'mongoose'
// @ts-ignore
import * as nassert from 'n-assert'
import sinon from 'sinon'

import { connect, disconnect } from '../../src/common/db'

nassert.initSinon(sinon)

before(async function () {
  // eslint-disable-next-line no-invalid-this
  this.timeout(0)
  await connect()
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
  await disconnect()
})

function _clearDbs() {
  const mongoDel = mongoose.modelNames().map(modelName => mongoose.model(modelName).deleteMany())

  return Promise.all(mongoDel)
}
