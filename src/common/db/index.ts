import '../../tasks/model'

import mongoose from 'mongoose'

import { appConfig } from '../../config/app'
import { NodeEnv } from '../enums/env'
import { logger } from '../utils/logger'

export const connection = mongoose.connection

// istanbul ignore next
if (appConfig.nodeEnv !== NodeEnv.test) {
  connection.on('error', err => {
    logger.error('mongodb connection error', err)
  })

  connection.on('connected', () => {
    logger.info(`Connected to mongodb: ${appConfig.port}`)
  })

  connection.on('disconnected', () => {
    logger.info('Disconnected from mongodb')
  })
}

export function connect() {
  return mongoose.connect(appConfig.dbConnectionUrl)
}

export function disconnect() {
  return connection.close()
}
