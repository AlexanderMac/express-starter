import './env'

import { once } from 'events'
import * as http from 'http'

import db from './src/common/db'
import { appConfig } from './src/config/app'
import { app } from './src/index'
import logger from './src/utils/logger'
;(async () => {
  try {
    // TODO: initUnhandledErrorListeners()

    logger.info('Initializing data sources...')
    await db.connect()

    logger.info('Initializing services...')
    const server = http.createServer(app)

    await once(server.listen(appConfig.port), 'listening')
    logger.info(`The app has been started on port ${appConfig.port}.`)
  } catch (error) {
    logger.error(error as Error)
  }
})()
