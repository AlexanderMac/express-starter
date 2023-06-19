import '../../users/model'

import mongoose from 'mongoose'

import { appConfig } from '../../config/app'
import logger from '../../utils/logger'

const conn = mongoose.connection

// istanbul ignore next
if (process.env.NODE_ENV !== 'test') {
  conn.on('error', err => {
    logger.error('mongodb connection error', err)
  })

  conn.on('connected', () => {
    logger.info(`Connected to mongodb: ${appConfig.port}`)
  })

  conn.on('disconnected', () => {
    logger.info('Disconnected from mongodb')
  })
}

function connect() {
  return mongoose.connect(appConfig.dbConnectionUrl)
}

function disconnect() {
  return conn.close()
}

export default {
  conn,
  connect,
  disconnect,
}
