import './env'

import { once } from 'events'
import * as http from 'http'

import { connect } from './src/common/db'
import { initUnhandledErrorListeners, logger } from './src/common/utils/logger'
import { appConfig } from './src/config/app'
import { createApp } from './src/express'
;(async () => {
  try {
    initUnhandledErrorListeners()

    logger.info('Initializing data sources...')
    await connect()

    logger.info('Initializing services...')
    const app = createApp()
    const server = http.createServer(app)

    await once(server.listen(appConfig.port), 'listening')
    logger.info(`The app has been started on port ${appConfig.port}.`)
  } catch (err: any) {
    logger.error(err)
  }
})()
