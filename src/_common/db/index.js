const mongoose = require('mongoose')
const config = require('../../../config/environment')
const logger = require('../utils/logger')

mongoose.models = {}

require('../../users/model')

const conn = mongoose.connection

// istanbul ignore next
if (process.env.NODE_ENV !== 'test') {
  conn.on('error', (err) => {
    logger.error('mongodb connection error', err)
  })

  conn.on('connected', () => {
    logger.info(`Connected to mongodb: ${config.get('db')}`)
  })

  conn.on('disconnected', () => {
    logger.info('Disconnected from mongodb')
  })
}

exports.conn = conn

exports.connect = () => {
  return mongoose.connect(config.get('db'), { useNewUrlParser: true })
}

exports.disconnect = () => {
  return conn.close()
}
