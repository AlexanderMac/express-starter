import { chain } from 'lodash-es'
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
  let mongoDel = chain(mongoose.models)
    .keys()
    .map(model => mongoose.model(model).deleteMany())
    .value()

  return Promise.all(mongoDel)
}
