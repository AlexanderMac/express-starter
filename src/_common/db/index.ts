import '../../users/model'

import mongoose from 'mongoose'

import { get } from '../../../config/environment'
import logger from '../utils/logger'

const conn = mongoose.connection

// istanbul ignore next
if (process.env.NODE_ENV !== 'test') {
  conn.on('error', err => {
    logger.error('mongodb connection error', err)
  })

  conn.on('connected', () => {
    logger.info(`Connected to mongodb: ${get('db')}`)
  })

  conn.on('disconnected', () => {
    logger.info('Disconnected from mongodb')
  })
}

function connect() {
  return mongoose.connect(get('db'))
}

function disconnect() {
  return conn.close()
}

export default {
  conn,
  connect,
  disconnect,
}
