import mongoose from 'mongoose'
import config from '../../../config/environment/index.js'
import logger from '../utils/logger.js'

mongoose.models = {}

import '../../users/model.js'

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

function connect() {
  return mongoose.connect(config.get('db'), { useNewUrlParser: true })
}

function disconnect() {
  return conn.close()
}

export default {
  conn,
  connect,
  disconnect
}
