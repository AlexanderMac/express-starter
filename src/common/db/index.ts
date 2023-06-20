import '../../users/model'

import mongoose from 'mongoose'

import { appConfig } from '../../config/app'
import { logger } from '../../utils/logger'
import { NodeEnv } from '../enums/env'

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
