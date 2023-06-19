import '../../users/model'

import mongoose from 'mongoose'

import { appConfig } from '../../config/app'
import logger from '../../utils/logger'
import { NodeEnv } from '../enums/env'

const conn = mongoose.connection

// istanbul ignore next
if (appConfig.nodeEnv !== NodeEnv.test) {
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
